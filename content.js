chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request === "3") {
		const attendancePayload = prepareExcelSheetData();
		sendResponse(attendancePayload);
		return;
	} else sendResponse();
	//VfPpkd-Bz112c-Jh9lGc
	const clicker = document.getElementsByClassName(
		"VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc"
	)[1];
	clicker.click();
	const element = document.getElementsByClassName("uGOf1d");

	let leftList = new Set();
	let prevCount = 0;
	element[0].addEventListener("DOMSubtreeModified", handleChange);

	initLocalStorage();
	handleChange();

	/*Handle the event when someone joins or lefts the meeting */
	function handleChange(e) {
		clicker.click();
		console.log(element[0].innerHTML);
		currentCount = Number(element[0].innerHTML);
		let howManyLeft = prevCount - currentCount;
		let howManyJoined = currentCount - prevCount;
		const nameList = document.getElementsByClassName("ZjFb7c");
		if (currentCount > prevCount)
			setTimeout(() => {
				handleJoin(nameList, howManyJoined);
			}, 100);
		//disabling this feature for now
		/*else
			setTimeout(() => {
				handleLeave(nameList, howManyLeft);
			}, 100);*/
		prevCount = currentCount;
	}

	/*Handle when someone joins the meeting*/
	function handleJoin(nameList, howManyJoined) {
		console.log("howManyJoined", howManyJoined);
		let newlyJoined = updateNewJoins(nameList, howManyJoined);
		let numberOfRejoins = howManyJoined - newlyJoined;
		//disabling this feature for now
		if (numberOfRejoins > 0) {
			//updateRejoins(numberOfRejoins ,leftList);
		}
	}
	/*Handles the event when someone leaves the meeting*/
	function handleLeave(nameList, howManyLeft) {
		console.log("howManyLeft", howManyLeft);
		const numberOfParticipents = getNumberOfParticipents();
		for (let i = 0; i < numberOfParticipents && howManyLeft; i++) {
			const participentKey = getParticipentKey(i);
			let found = searchInHTMLCollection(participentKey, nameList);
			if (!found) {
				howManyLeft--;
				console.log("updating: ", participentKey);
				updateLeftPerson(participentKey);
				leftList.add(participentKey);
			}
			found = false;
		}
	}
});
