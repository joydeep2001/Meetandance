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
		let found = false;
		for(let i = 0;i < nameList.length && howManyJoined;i++) {
			let key = nameList[i].innerHTML;
			for(let j = 0;j < localStorage.length;j++) {
				
				if(getKey(key) == localStorage.key(j)) {
					found = true;
					break;
				}
			}
			if(!found) {
				howManyJoined--;
				let value = insertNewRecord();
				localStorage.setItem(key, value);
			}
			found = false;
		}
		console.log("Set : ", leftList);
		Array.from(leftList).forEach((key) => {
			let value = localStorage.getItem(key);
			value = JSON.parse(value);
			let lastIdx = value.length - 1;
			if(value[lastIdx].left != null) {
				value.push(getData());
				value = JSON.stringify(value);
				localStorage.setItem(key, value);
			}
		});

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