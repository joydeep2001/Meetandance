import { getKey, getData, searchInLocalStorage, searchInHTMLCollection,insertNewRecord } 
from './utils.js';

class Updators {
	constructor() {
		this.leftList = new Set();
	}
	updateRejoins = (reJoins) => {
		for(let i = 0;i < this.leftList.length && reJoins;i++) {
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

	updateNewJoins = (nameList, howManyJoined) => {
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
	updateLeaves = (nameList, howManyLeft) => {
		for(let i = 0;i < localStorage.length && howManyLeft;i++) {
			let key = localStorage.key(i);
			let found = searchInHTMLCollection(key, nameList);
			if(!found) {
				howManyLeft--;
				console.log("updating: ", key);
				updateLeavingTime(key);
				this.leftList.add(key);
			}
			found = false;
		}
	}
	updateLeavingTime = (key) => {
		let value = localStorage.getItem(key);
		value = JSON.parse(value);
		console.log("value :", value);
		let lastIdx = value.length - 1;
		console.log("lastIdx: ", lastIdx);
		value[lastIdx].left = Date.now();
		let JSONvalue = JSON.stringify(value);
		localStorage.setItem(key, JSONvalue);
	}
}

export default Updators;