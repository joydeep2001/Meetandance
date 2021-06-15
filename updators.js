function updateRejoins(reJoins, leftList) {
	for (let i = 0; i < leftList.length && reJoins; i++) {
		let participentKey = getParticipentKey(i);
		let value = localStorage.getItem(participentKey);
		value = JSON.parse(value);
		let lastIdx = value.length - 1;
		if (value[lastIdx].left != null) {
			reJoins--;
			value.push(getData());
			value = JSON.stringify(value);
			localStorage.setItem(participentKey, value);
		}
	}
}

function updateNewJoins(nameList, howManyJoined) {
	let newJoinCount = 0;
	for (let i = 0; i < nameList.length && newJoinCount < howManyJoined; i++) {
		let found = false;
		let key = getKey(nameList[i].innerHTML);
		found = searchInLocalStorage(key);
		if (!found) {
			newJoinCount++;
			let value = newRecord();
			localStorage.setItem(key, value);
		}
		found = false;
	}

	return newJoinCount;
}

function updateLeftPerson(key) {
	let value = localStorage.getItem(key);
	value = JSON.parse(value);
	console.log("value :", value);
	let lastIdx = value.length - 1;
	console.log("lastIdx: ", lastIdx);
	value[lastIdx].left = Date.now();
	let JSONvalue = JSON.stringify(value);
	localStorage.setItem(key, JSONvalue);
}
/*Returns the necessory details when someone newly joins the meeting*/
function newRecord() {
	let value = getMeetingId();
	//value.push(getData());
	let JSONvalue = value;
	console.log(JSONvalue);
	return JSONvalue;
}