const {google} = require('googleapis');
const keys = require('./keys.json');
const client = new google.auth.JWT (
	keys.client_email, 
	null,
	keys.private_key,
	['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize((err, tokens)=> {
	if(err) {
		console.log(err.message);
		return;
	}
	console.log('connected');
	saveToGs(client);
});
const gsapi = google.sheets({version : 'v4', auth: client});

document.addEventListener('DOMContentLoaded', function() {
	const startBtn = document.querySelector('#start');
	const stopBtn = document.querySelector("#stop");
	const saveToGsBtn = document.querySelector('#save');
	const sheetURL = document.querySelector('#gsId');

	startBtn.addEventListener('click', startAttendanceRecord, false);
	stopBtn.addEventListener('click', stopAttendanceRecord, false);
	saveToGsBtn.addEventListener('click', saveToGs, false);

	function getSheetIdFromURL () {
		const pattern = /(d\/)(.+)(\/)/i;
		const capturingGroups = sheetURL.value.match(pattern);
		const sheetId = capturingGroups[2];
		console.log(sheetId);
		return sheetId;
	}

	function startAttendanceRecord() {
		chrome.tabs.query({currentWindow: true, active: true}, 
			function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, '1')
			})
	}

	function stopAttendanceRecord() {
		chrome.tabs.query({ current: true, active: true}), 
			function (tabs) {
				chrome.tabs.sendMessage(tabs[0], '0');
			}
	}
	function prepareData() {
		for(let i = 0;i < localStorage.length;i++) {
			let key = localStorage.key(i);
			let excelSheetData = excelSheetData.push([key]);
		}
		return excelSheetData;
	}

	async function saveToGs(client) {
		const id = getSheetIdFromURL();
		const newDataArray = prepareData();

		const updateCred = {
			spreadsheetId : id,
			range: 'Data!E2',
			valueInputOption: 'USER_ENTERED',
			resource: { values: newDataArray }
		}
		const res = await gsapi.spreadsheets.values.update(updateCred);
		console.log(res);

	}

}, false);


