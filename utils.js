class Uils {
	getKey = (rawKey) => {
		let key = rawKey; 
		//do some processing
		return key;
	}

	getData = () => {
		return {"joined" : Date.now(), "left" : null};
	}
		
	searchInLocalStorage = (key) => {
		for(let j = 0;j < localStorage.length;j++) 
			if(key == localStorage.key(j)) return true;
		return false;
	}

	searchInHTMLCollection = (key, className) => {
		for(let j = 0;j < className.length;j++) {
				let rawKey = className[j].innerHTML;
				if(key == this.getKey(rawKey)) return true;
			}
			return false;
	}
	insertNewRecord = () => {
		let value = [];
		value.push(this.getData());
		let JSONvalue = JSON.stringify(value);
		console.log(JSONvalue);
		return JSONvalue;

	}
};

export default Utils;