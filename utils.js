function searchInHTMLCollection(key, className) {
	for (let j = 0; j < className.length; j++) {
		let rawKey = className[j].innerHTML;
		if (key == getKey(rawKey)) return true;
	}
	return false;
}

function searchInLocalStorage(key) {
	for (let j = 0; j < localStorage.length; j++)
		if (key == localStorage.key(j)) return true;
	return false;
}

function getData() {
	return { joined: Date.now(), left: null };
}

function prepareExcelSheetData() {
	let excelSheetData = [];
	const meetingId = localStorage.getItem("meetId");
	//if(meetingId == null) return JSON.stringify({});
	for (let i = 0; i < getNumberOfParticipents(); i++) {
		let key = getParticipentKey(i);
		if (getValuefromLocalStorage(key) === meetingId) {
			console.log(key);
			excelSheetData.push(key);
		}
	}
	excelSheetData = JSON.stringify(excelSheetData);
	let excelSheetObj = { data: excelSheetData };
	console.log(excelSheetObj);
	return excelSheetObj;
}
/*Returns the actual key by converting it from a given Raw Key*/
function getKey(rawKey) {
	let key = rawKey;
	//do some processing

	return key.toLowerCase();
}

function getMeetingId() {
	const re = /[^\/].+/gi;
	const pathname = location.pathname;
	let meetingId = pathname.match(re);
	console.log(meetingId);
	return meetingId[0];
}

function initLocalStorage() {
	const meetingId = getMeetingId();
	if (localStorage.getItem("meetId") != null) {
		if (localStorage.getItem("meetId") != meetingId) {
			console.log("localStorage cleared");
			localStorage.clear();
			localStorage.setItem("meetId", meetingId);
			return;
		}
	}
	localStorage.setItem("meetId", meetingId);
}
function getNumberOfParticipents() {
	return localStorage.length;
}

function getParticipentKey(i) {
	return localStorage.key(i);
}
function getValuefromLocalStorage(key) {
	return localStorage.getItem(key);
}
function getSheetIdFromURL() {
	const pattern = /(d\/)(.+)(\/)/i;
	const capturingGroups = sheetURL.value.match(pattern);
	const sheetId = capturingGroups[2];
	console.log(sheetId);
	return sheetId;
}
