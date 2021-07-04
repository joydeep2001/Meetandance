const { google } = require("googleapis");
const keys = require("./keys.json");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mymap = require("./nameMap.json");

const month = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("<h1>Welcome Home<h1>");
});
app.post("/submit", async (req, res) => {
	console.log(req.body);
	let payload = req.body;
	const responseStatus = await sendReqToGS(payload);
	console.log(responseStatus);
	res.status(Number(responseStatus.status)).json({
		message: "Success",
	});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}..`));

function thereExists(name, payloadData) {
	for (let ind in payloadData) if (payloadData[ind] === name) return true;
	return false;
}

function getPresentAbsentList(payloadData) {
	payloadData = JSON.parse(payloadData);
	let presentAbsentList = new Array();
	let today = new Date();
	presentAbsentList.push([
		`${month[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`,
	]);

	for (let key in mymap) {
		//console.log(mymap[key]);
		if (thereExists(mymap[key], payloadData))
			presentAbsentList.push(["Present"]);
		else presentAbsentList.push(["Absent"]);
	}
	//console.log(presentAbsentList.length);
	return JSON.stringify(presentAbsentList);
}

async function sendReqToGS(payload) {
	return new Promise((resolve, reject) => {
		const client = new google.auth.JWT(
			keys.client_email,
			null,
			keys.private_key,
			["https://www.googleapis.com/auth/spreadsheets"]
		);

		client.authorize(async (err, tokens) => {
			if (err) {
				console.log(err.message);
				return;
			}
			console.log("connected");
			const columNumber = 'D';
			payload.data = getPresentAbsentList(payload.data);
			const finalRes = await saveToGs(client, payload, columNumber, 5);
			resolve(finalRes);
		});
	});
}
async function getColumnNumber(cl, payload) {
	return new Promise(async (resolve, reject) => {
		const gsapi = google.sheets({ version: "v4", auth: cl });
		const opt = {
			spreadsheetId: payload.sheetId,
			range: "Sheet1!B12",
		};

		let result = await gsapi.spreadsheets.values.get(opt);
		resolve(result);
	});
}
async function saveToGs(client, payload, columNumber, row) {
	return new Promise(async (resolve, reject) => {
		const gsapi = google.sheets({ version: "v4", auth: client });
		const id = payload.sheetId;
		console.log("line 68 ", columNumber);
		const [[col]] = columNumber;
		console.log("col ", col);
		console.log(payload.data);
		const updateCred = {
			spreadsheetId: id,
			range: `Attendance Sheet!${col}${row}`,
			valueInputOption: "USER_ENTERED",
			resource: { values: JSON.parse(payload.data) },
		};
		const response = await gsapi.spreadsheets.values.update(updateCred);
		resolve(response);
	});
}

async function appendCol(client, payload, col) {
	const gsapi = google.sheets({ version: "v4", auth: client });
	const id = payload.id;

	const res = gsapi.spreadsheets.batchUpdate({
		spreadsheetId: id,
		resource:{
			requests: [
				{
					insertDimension: {
						range: {
							sheetId: '0',
							dimension: "COLUMNS",
							startIndex: 3,
							endIndex: 4
						},
						inheritFromBefore: false
					}
				}
			]
		}
	});
	console.log(res);
	return res;
}

//to be modified later
//because this logic breaks when the column number exceeds Z

function getNextColumn(columNumber) {
	let col = columNumber;
	const lastpos = col.length - 1;
	const charValue = col.charCodeAt(lastpos);
	let nextCol = String.fromCharCode(charValue + 1);
	console.log(nextCol);
	return nextCol;
}
