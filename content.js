// alert('its google meet');
chrome.runtime.onMessage.addListener((request)=>{
	console.log(request);
	const element = document.getElementsByClassName('wnPUne N0PJ8e');
	const clicker = document.getElementsByClassName('uArJ5e UQuaGc kCyAyd QU4Gid foXzLb IeuGXd')[0];
	clicker.click();

	element[0].addEventListener('DOMSubtreeModified', handleChange);
	let leftList = new Set();
	localStorage.clear();

	let prevCount = 0;
	handleChange();
	/*Handle the event when someone joins or lefts the meeting */
	function handleChange(e) {
		clicker.click();
	    console.log(element[0].innerHTML);
	    currentCount = Number(element[0].innerHTML);
	    let howManyLeft = prevCount - currentCount;
	    let howManyJoined = currentCount - prevCount;
	    const nameList = document.getElementsByClassName('ZjFb7c');
	    if(currentCount > prevCount) 
	    	setTimeout(() => { handleJoin(nameList, howManyJoined) }, 100);
	    else setTimeout(() => { handleLeave(nameList, howManyLeft) }, 100); 
	    prevCount = currentCount;
	}
	
	/*Handle when someone joins the meeting*/
	function handleJoin(nameList, howManyJoined) {
		console.log("howManyJoined", howManyJoined);
		let newlyJoined = updateNewJoins(nameList, howManyJoined);
		let numberOfRejoins = howManyJoined - newlyJoined;

		console.log("Set : ", leftList);

		if(numberOfRejoins > 0) {
			updateRejoins(numberOfRejoins)
		}
		
		
		

	}
/*Handles the event when someone leaves the meeting*/
	function handleLeave(nameList, howManyLeft) {
		let found = false;
		console.log("howManyLeft", howManyLeft);
		for(let i = 0;i < localStorage.length && howManyLeft;i++) {
			let key = localStorage.key(i);
			for(let j = 0;j < nameList.length;j++) {
				if(key == getKey(nameList[j].innerHTML)) {
					found = true;
					break;
				}
			}
			if(!found) {
				howManyLeft--;
				console.log("updating: ", key);
				UpdateLocalStorage(key);
				leftList.add(key);
			}
			found = false;

		}

	}

	function updateRejoins(reJoins) {
		for(let i = 0;i < leftList.length && reJoins;i++) {
			let key = localStorage.key(i);
			let value = localStorage.getItem(key);
			value = JSON.parse(value);
			let lastIdx = value.length - 1;
			if(value[lastIdx].left != null) {
				reJoins--;
				value.push(getData());
				value = JSON.stringify(value);
				localStorage.setItem(key, value);
			}
		}
	
	}

	function updateNewJoins(nameList, howManyJoined) {
		let newJoinCount = 0;
		for(let i = 0;i < nameList.length && newJoinCount < howManyJoined;i++) {
			let found = false;
			let key = getKey(nameList[i].innerHTML);
			found = searchInLocalStorage(key);
			if(!found) {
				newJoinCount++;
				let value = insertNewRecord();
				localStorage.setItem(key, value);
			}
			found = false;
		}

		return newJoinCount;
	}

	function searchInLocalStorage(key) {
		for(let j = 0;j < localStorage.length;j++) 
			if(key == localStorage.key(j)) return true;
			
			return false;
	}


	function UpdateLocalStorage(key) {
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
	function insertNewRecord() {
		let value = [];
		value.push(getData());
		let JSONvalue = JSON.stringify(value);
		console.log(JSONvalue);
		return JSONvalue;

	}
	/*Returns the actual key by converting it from a given Raw Key*/
	function getKey(rawKey) {
		let key = rawKey; 
		//do some processing
		return key;
	}

	function getData() {
		return {"joined" : Date.now(), "left" : null};
	}
	
})