var isAdmin = false;
var SERVER_URL = "http://bugs.truthfactory.tk"; // no ending slash! FUCKER
/**
 * Gets all available Lectures
 */
function getLectures() {
	$.ajax({
		type : "GET",
		url : SERVER_URL + "/lectures",
		dataType : "json",
		contentType : "application/json; charset=utf-8"
	}).success(function(data, textStatus, jqXHR) {
		for (var i = 0; i < data.length; i++) {
			var status = data[i].status;
			var id = data[i].id;
			var name = data[i].name;
			var begin_time = data[i].begin_time;
			var end_time = data[i].end_time;
			if (status == "running") {
				$('#currentLec').text(id);
				getCurrentStandings();
				getCurrentCounts();
				window.setInterval(function() {
					getCurrentStandings();
					getCurrentCounts();
				}, 60000);

			}
			if (data.winner != null) {
				$('#winners').append("<span>Haui:" + data.winner.haui.username + "</span><br/>");
				$('#winners').append("<span>Pieps:" + data.winner.pieps.username + "</span><br/>");
			}
		}
	});
}

/**
 * Gets the (chronological) next Lecture
 */
function getNextLecture(successCallback) {
	$.ajax({
		type : "GET",
		url : SERVER_URL + "/lectures/next",
		dataType : "json",
		contentType : "application/json; charset=utf-8"
	}).success(function(data, textStatus, jqXHR) {
		var status = data.status;
		var id = data.id;
		var name = data.name;
		var begin_time = data.begin_time;
		var end_time = data.end_time;
		$('#nextLec').text(name);
		$('#nextLec_id').text(id);
		getLecture(id);
		if (successCallback !== null && successCallback !== undefined) {
			successCallback(new Array(id, name));
		}
	});

}

/**
 * Get the lecture with the given id
 * 
 * @param id
 */
function getLecture(id) {
	$.ajax({
		type : "GET",
		url : SERVER_URL + "/lectures/" + id,
		dataType : "json",
		contentType : "application/json; charset=utf-8"
	}).success(function(data, textStatus, jqXHR) {
		var status = data.phase;
		var id = data.id;
		var name = data.name;
		var begin_time = data.begin_time;
		var end_time = data.end_time;
		var admin = data.admin;
		var winner = data.winner;
		if (admin != undefined) {
			if (admin.user_id == window.localStorage.getItem("user_id")) {
				isAdmin = true;
				$('#adminincrement').show();
			}
		}
	});
}

/**
 * Vote for the lecture
 * 
 * @param lectureid
 * @param userid
 * @param pieps
 *            The guess for "pieps"´s Input
 * @param haui
 *            The guess for "haui"´s Input
 */
function vote(lectureid, userid, pieps, haui) {
	console.log("VOTE FOR haui[" + haui + "], pieps[" + pieps + "], lec[" + lectureid + "], user[" + userid + "]");
	if (isNaN(pieps) || isNaN(haui)) {
		alert("Use numbers for voting you fuck!");
		return;
	}

	var json = {
		"user_id" : userid,
		"guesses" : [ {
			"guess_on" : "haui",
			"count" : haui
		}, {
			"guess_on" : "pieps",
			"count" : pieps
		} ]
	};

	$.ajax({
		type : "POST",
		url : SERVER_URL + "/lectures/" + lectureid + "/guesses",
		dataType : "json",
		contentType : "application/json; charset=utf-8",
		data : JSON.stringify(json)
	}).success(function(data, textStatus, jqXHR) {
		$('#votefornext').hide();
		console.log(JSON.stringify(data));
	});
}

/**
 * Increment the actual input by one. Only available for the current game-admin
 * 
 * @param piepsid
 *            Either "haui" or "pieps"
 */
function upvotePieps(piepsid) {
	console.log("Upvote" + piepsid);
	$.ajax({
		type : "POST",
		url : SERVER_URL + "/lectures/" + $('#currentLec').text() + "/guesses/admin/" + piepsid,
		dataType : "json",
		contentType : "application/json; charset=utf-8"
	}).success(function(data, textStatus, jqXHR) {
	});
}

/**
 * Set the user name on the server ONLY ONCE
 * 
 * @param userid
 *            The username
 */
function setServerUserId(userid) {
	$.support.cors = true;
	var json;
	json = {
		"username" : userid
	};
	$.ajax({
		type : "POST",
		url : SERVER_URL + "/users",
		data : JSON.stringify(json),
		dataType : "json",
		crossDomain : true,
		contentType : "application/json; charset=utf-8"
	}).success(function(data, textStatus, jqXHR) {
		var user_id = data.user_id;
		window.localStorage.setItem("user_id", user_id);
		window.localStorage.setItem("user_name", userid);
		$('#idform').hide();
		$('#userid').text($('#setid').val());
	});
}

function getCurrentStandings() {
	$.ajax({
		type : "GET",
		url : SERVER_URL + "/lectures/" + $('#currentLec').text() + "/guesses",
		dataType : "json",
		crossDomain : true,
		contentType : "application/json; charset=utf-8"
	}).success(function(data, textStatus, jqXHR) {
		console.log(JSON.stringify(data));
		$('#currentStandings').empty();
		for (var i = 0; i < data.guesses.length; i++) {
			var html = "<br/><span>" + data.guesses[i].username + ":</span>";
			html += "<br/><span>Haui:" + data.guesses[i].guesses[0].count + "</span><br/>";
			html += "<span>Pieps:" + data.guesses[i].guesses[1].count + "</span><br/><span>----------------------------</span>";
			$('#currentStandings').append(html);
			$('#currentStandings').show();
		}
	});
}

function getCurrentCounts() {
	$.ajax({
		type : "GET",
		url : SERVER_URL + "/lectures/" + $('#currentLec').text() + "/guesses/admin",
		dataType : "json",
		crossDomain : true,
		contentType : "application/json; charset=utf-8"
	}).success(function(data, textStatus, jqXHR) {
		$('#actualHaui').text(data.haui);
		$('#actualPieps').text(data.pieps);
	});
}