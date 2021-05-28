// alert('its google meet');
chrome.runtime.onMessage.addListener((request)=>{
	console.log(request);
	const element = document.getElementsByClassName('wnPUne N0PJ8e');
	const clicker = document.getElementsByClassName('uArJ5e UQuaGc kCyAyd QU4Gid foXzLb IeuGXd')[0];
	clicker.click();

	element[0].addEventListener('DOMSubtreeModified', detectAction);

		

	function detectAction(e) {
	    console.log(element[0].innerHTML);
	    setTimeout(()=>{
	    	Array.from(document.getElementsByClassName('ZjFb7c')).forEach(name =>{
	    		console.log(name.innerHTML);
	    	});
	    }, 1000);
	    
	}
	


})