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
	const meetingId = getMeetingId();
	for (let i = 0; i < getNumberOfParticipents(); i++) {
		let key = getParticipentKey(i);
		if (getValuefromLocalStorage(key) === meetingId) {
			console.log(key);
			excelSheetData.push([key]);
		}
	}
	excelSheetData = JSON.stringify(excelSheetData);
	let jsonObj = { data: excelSheetData };
	jsonObj = JSON.stringify(jsonObj);
	console.log(jsonObj);
	return jsonObj;
}
/*Returns the actual key by converting it from a given Raw Key*/
function getKey(rawKey) {
	let key = rawKey;
	//do some processing
	return key;
}

function getMeetingId() {
	const re = /[^\/].+/gi;
	const pathname = location.pathname;
	let meetingId = pathname.match(re);
	return meetingId.toString();
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
