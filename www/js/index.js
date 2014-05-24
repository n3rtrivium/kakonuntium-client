var userid;

function setUserId(id) {
	window.localStorage.setItem("userid", id);
	userid = id;
		setServerUserId(id);
}

$(document).ready(function(){
	$('#idform').hide();
	if(window.localStorage.getItem("user_id") == null){
		$('#idform').show();
		
	}
});
