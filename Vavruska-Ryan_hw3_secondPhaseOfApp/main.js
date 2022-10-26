/*
 File: /~rvavrusk/index.html
 Ryan Vavruska, UMass Lowell Student, ryan_vavruska@student.uml.edu
*/

let loc = document.getElementById('location');
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    location.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  loc.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}

getLocation();

var submitButton = document.getElementById('submitButton');
submitButton.onclick = function () {
	let about = document.getElementById('aboutUser');
	about.innerHTML = "Welcome to the page! </br>" +
		"Your first name is " + document.getElementById("fname").value + "</br>" +
		"Your last name is " + document.getElementById("lname").value + "</br>" +
		"You are from " + document.getElementById("from").value + "</br>" +
		"You want to be" + document.getElementById("where").value + "</br>" +
		"Your family is from " + document.getElementById("family").value + "</br>";
		
	var photo = document.getElementById("photo").files[0];
	var resume = document.getElementById("photo").files[0];
	
}