var isAdmin = true;
var SERVER_URL = "http://bugs.truthfactory.tk";
/**
 * Gets all available Lectures
 */
function getLectures(){
	var json;
	json = {"username":"test"};
	$.ajax({
		type: "GET",
		url: "http://bugs.truthfactory.tk/lectures",
		data: json,
		dataType: "json"
		})
		.success(function(data, textStatus, jqXHR){
			alert(data+",  "+textStatus+", "+jqXHR);
		});
}

/**
 * Gets the (chronological) next Lecture
 */
function getNextLecture(){
	return 3;
}

/**
 * Get the lecture with the given id
 * @param id
 */
function getLecture(id){
	
}

/**
 * Vote for the lecture
 * @param lectureid
 * @param userid
 * @param pieps The guess for "pieps"´s Input
 * @param haui The guess for "haui"´s Input
 */
function vote(lectureid, userid, pieps, haui){
	console.log("VOTE FOR haui["+haui+"], pieps["+pieps+"]");
	if(isNaN(pieps) || isNaN(haui)){
		alert("Use numbers for voting you fuck!");
		return;
	}
	//TODO:
	//{userid: "user-id", votings:{"pieps": number, "haui": number}}
}

/**
 * Get the current votings for the given lecture
 * @param id
 */
function getLectureVotings(id){
	
}

/**
 * Increment the actual input by one.
 * Only available for the current game-admin
 * @param piepsid Either "haui" or "pieps"
 */
function upvotePieps(piepsid){
	console.log("Upvote"+piepsid);
}

/**
 * Get the guesses of all users for the given lecture
 * @param id The lecture id
 */
function getUserGuesses(id){
	
}

/**
 * Set the user name on the server
 * ONLY ONCE
 * @param userid The username
 */
function setServerUserId(userid){
	$.support.cors = true;
	var json;
	json = {"username":"test"};
	$.ajax({
		type: "POST",
		url: "http://bugs.truthfactory.tk/users",
		data: json,
		dataType: "json",
		crossDomain: true,
		contentType: "application/json; charset=utf-8"
		})
		//TODO: set content type to json
		.success(function(data, textStatus, jqXHR){
			console.log(data+",  "+textStatus+", "+jqXHR);
		});
//	
//	$.ajax({
//	     url:"https://bugs.truthfactory.tk/users",
//	     data: json,
//	     type:"POST",
//	     dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
//	     success:function(json){
//	         // do stuff with json (in this case an array)
//	         alert("Success");
//	     },
//	     error:function(){
//	         alert("Error");
//	     }      
//	});
	
}

function getCurrentStandings(lectureid){
	$('#currHaui').text("42");
	$('#currPieps').text("32");
}