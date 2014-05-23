var userid;

function getUserid() {
//	var userid = window.localStorage.getItem("userid");
//	if (userid == null || userid == undefined || userid == "") {
		$('#idform').show();
//	}
//	else {
//		$('#userid').text(userid);
//		return userid;
//	}

}

function setUserId(id) {
	window.localStorage.setItem("userid", id);
	userid = id;
	setServerUserId(id);
}


function displayNextLecture(){
	
	
	return "VPN";
}

function getLectureId(){
	return getNextLecture();
}

