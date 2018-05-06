// Hide form to disallow checkin
$("form").hide();

// Change message to show we're tracking their location
$("p#message").html("Tracking your location now...");

// Find the users location using geolocation
watchUser = navigator.geolocation.watchPosition(success);

// success is run when watchPosition is successful 
function success(position){

	// Test if tracking worked in browser console
	console.log("Tracking was successful!");
	
	// View position object in browser console
	console.log(position);

	// Capture user location coordinates in variables
	var userLat = position.coords.latitude;
	var userLon = position.coords.longitude;

  // Store target location in variables
  var targetLat = 37.5424004;
  var targetLon = -77.46983869999997;
  // This location is in Richmond, VA
  
  //Set the Radius 
  var rad = 32; // 0.01km= 10 meters
  
  //Calculate the distance
  var distance = getDistanceFromLatLonInKm(userLat,userLon,targetLat,targetLon);  
  
  //If (distance is less than the radius) allow checkin else disallow checkin, encourage them to come closer
  
  //LOGIC: is the user here?
  if (distance < rad){ 
    $("form").show();
    $("p#message").html("Welcome to the employer's booth! Enter your Twitter handle to access the data.");
    //stuff to do if true 
  } else { 
    $("form").hide();
    $("p#message").html("Swing by our booth to play!");
    //stuff to do if NOT true
  }
    // To test - make the radius really big temporarily
    
} // END success




// code from stackoverflow q27928 to calculate distance

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
