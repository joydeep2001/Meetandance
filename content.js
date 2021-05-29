// alert('its google meet');
chrome.runtime.onMessage.addListener((request)=>{
	console.log(request);
	const element = document.getElementsByClassName('wnPUne N0PJ8e');
	const clicker = document.getElementsByClassName('uArJ5e UQuaGc kCyAyd QU4Gid foXzLb IeuGXd')[0];
	clicker.click();

	element[0].addEventListener('DOMSubtreeModified', handleChange);

	localStorage.clear();

	let prevCount = 0;
	handleChange();
	/*Handle the event when someone joins or lefts the meeting */
	function handleChange(e) {
		clicker.click();
	    console.log(element[0].innerHTML);
	    currentCount = Number(element[0].innerHTML);
	    const nameList = document.getElementsByClassName('ZjFb7c');
	    if(currentCount > prevCount) setTimeout(() => { handleJoin(nameList) }, 100);
	    else setTimeout(() => { handleLeave(nameList) }, 100); 
	    prevCount = currentCount;
	    
	}
	
	/*Handle when someone joins the meeting*/
	function handleJoin(nameList) {
		let JSONvalue = "";
		Array.from(nameList).forEach((name) => {
			let key = getKey(name.innerHTML);
			console.log(`${key}`);
			let value = localStorage.getItem(key); 
			if(value === null) {
				//Means the person newly joined the meeting
				value = insertNewRecord();
			}

			else {
				//Means the person once left and now joining again
				value = JSON.parse(value);
				value.push(getData());
				value = JSON.stringify(value);
			} 
			console.log(JSONvalue);
			localStorage.setItem(key, value);
		});

	}
//need to change this function
	function handleLeave(nameList) {
		let i;
		for(i = 0;i < nameList.length;i++) {
			let prevKey = localStorage.key(i);
			let currentKey = nameList[i].innerHTML;
			if(prevKey != nameList) {
				//Means this person left 
				UpdateLocalStorage(prevKey);
			}

		}

		while(i < localStorage.length) {
			let key = localStorage.key(i);
			UpdateLocalStorage(key);
		}

	}

	function UpdateLocalStorage(key) {
		let value = localStorage.getItem(key);
		value = JSON.parse(value);
		let lastIdx = value.length - 1;
		value[lastIdx].left = Date.now();
		localStorage.setItem(key, value);
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