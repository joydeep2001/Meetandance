document.addEventListener(
	"DOMContentLoaded",
	function () {
		const startBtn = document.querySelector("#start");
		const stopBtn = document.querySelector("#stop");
		const saveToGsBtn = document.querySelector("#save");
		const sheetURL = document.querySelector("#gsId");
		const requestStatus = document.querySelector("#status");

		startBtn.addEventListener("click", startAttendanceRecord, false);
		stopBtn.addEventListener("click", stopAttendanceRecord, false);
		saveToGsBtn.addEventListener("click", saveAttendanceRecord, false);

		function startAttendanceRecord() {
			chrome.tabs.query(
				{ currentWindow: true, active: true },
				function (tabs) {
					chrome.tabs.sendMessage(tabs[0].id, "1", () =>
						console.log("start")
					);
				}
			);
		}

		function stopAttendanceRecord() {
			chrome.tabs.query(
				{ currentWindow: true, active: true },
				function (tabs) {
					chrome.tabs.sendMessage(tabs[0].id, "0", () =>
						console.log("stop")
					);
				}
			);
		}
		function saveAttendanceRecord() {
			chrome.tabs.query(
				{ currentWindow: true, active: true },
				function (tabs) {
					chrome.tabs.sendMessage(tabs[0].id, "3", saveToGs);
				}
			);
		}
		function getSheetIdFromURL() {
			const pattern = /(d\/)(.+)(\/)/i;
			const capturingGroups = sheetURL.value.match(pattern);
			const sheetId = capturingGroups[2];
			console.log(sheetId);
			return sheetId;
		}

		function saveToGs(attendancePayload) {
			const xhr = new XMLHttpRequest();
			attendancePayload.sheetId = getSheetIdFromURL();
			attendancePayload = JSON.stringify(attendancePayload);
			console.log("attendancePayload: ", attendancePayload);
			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4 && xhr.status == 200) {
					requestStatus.innerHTML = xhr.responseText;
					console.log(xhr);
				}
			};
			const requestURL =
				"https://guarded-island-80077.herokuapp.com/submit";
			const requestURL_local = "http://localhost:3000/submit";
			xhr.open("POST", requestURL_local, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(attendancePayload);
		}
	},
	false
);
