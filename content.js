import { updateRejoins, updateNewJoins, updateLeaves, updateLeavingTime } from './Updators';

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

	}


})
