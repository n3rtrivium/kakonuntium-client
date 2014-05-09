var userid;

function getUserid() {
	var userid = window.localStorage.getItem("userid");
	if (userid == null || userid == undefined || userid == "") {
		// TODO set user id once
		$('#idform').show();
	}
	else {
		$('#userid').text(userid);
		alert(userid);
		return userid;
	}

}

function setUserId(id) {
	window.localStorage.setItem("userid", id+"");
	userid = id;
}