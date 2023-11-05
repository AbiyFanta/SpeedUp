// JavaScript code for route length and travel time calculation using Google Maps API
function calculateRoute() {
  // Get user-specified origin address
  var originAddress = document.getElementById('origin').value;

  // Get user-specified destination address or set UC Davis as default
  var destinationAddress = document.getElementById('destination').value || 'UC Davis, Davis, CA';

  // Get user-specified average speed in mph from the slider
  var averageSpeed = parseFloat(document.getElementById('speed').value);

  // Update the displayed speed value as the user moves the slider
  document.getElementById('speed-display').textContent = averageSpeed + ' mph';

  // Create a DirectionsService object
  var directionsService = new google.maps.DirectionsService();

  // Define the request object
  var request = {
    origin: originAddress,
    destination: destinationAddress,
    travelMode: 'DRIVING' // You can also use 'WALKING', 'BICYCLING', or 'TRANSIT'
  };

  // Call the DirectionsService route method with the request object
  directionsService.route(request, function(response, status) {
    if (status === 'OK') {
      // Get the normal travel time in seconds from the API response
      var normalTravelTimeInSeconds = response.routes[0].legs[0].duration.value;

      // Convert normal travel time from seconds to hours
      var normalTravelTimeInHours = normalTravelTimeInSeconds / 3600;

      // Calculate the route length in meters
      var routeLengthInMeters = 0;
      for (var i = 0; i < response.routes[0].legs.length; i++) {
        routeLengthInMeters += response.routes[0].legs[i].distance.value;
      }

      // Convert meters to miles
      var routeLengthInMiles = routeLengthInMeters * 0.000621371;

      // Calculate expected travel time in hours based on average speed
      var expectedTravelTimeInHours = routeLengthInMiles / averageSpeed;

      // Calculate the difference between the expected travel time and the normal travel time
      var etaDifference = expectedTravelTimeInHours - normalTravelTimeInHours;

      
      // Display the route length, normal travel time, and ETA difference on the web page
      document.getElementById('route-length').innerHTML = 'Route Length: ' + routeLengthInMiles.toFixed(2) + ' miles';
      document.getElementById('normal-travel-time').innerHTML = 'Normal Travel Time: ' + normalTravelTimeInHours.toFixed(2) + ' hours';
      document.getElementById('new-travel-time').innerHTML = 'New Travel Time: ' +  (expectedTravelTimeInHours).toFixed(2) + ' hours';
      
      //if chosen a slower speed then the normal, change background to red and edit wording
      if (etaDifference > 0){
        travelTime.style.backgroundColor = '#BB1E10';
        document.getElementById('eta-difference').innerHTML = 'You added ' + (60*etaDifference).toFixed(2) + ' minutes.';
      } else if(etaDifference == 0) {                     //Added Yellow Box if there is no time saved or added
        travelTime.style.backgroundColor = '#F7B500';
        document.getElementById('eta-difference').innerHTML = 'You made no change.';
      } else {
        //normal procedure if chose a faster speed (green box)
        travelTime.style.backgroundColor = '#00AF4F'; 
        document.getElementById('eta-difference').innerHTML = 'You saved ' + (-1*60*etaDifference).toFixed(2) + ' minutes!';
      }
      // Remove the 'hidden' class to show the data
      document.getElementById('travelTime').classList.remove('hidden');
      
    } else {
      // Handle error cases
      document.getElementById('route-length').innerHTML = 'Error: ' + status + '. Incorrect Address or not driveable (overseas)';
      document.getElementById('normal-travel-time').innerHTML = '';
      document.getElementById('eta-difference').innerHTML = '';
    }

    
  });
}

// function to display the speed value of the slider
var speedSlider = function(){
  var slider = document.getElementById('speed');
  slider.addEventListener('input', function() {
    var speed = parseFloat(document.getElementById('speed').value);
    document.getElementById('speed-display').innerHTML = '' + speed + ' mph';  // Update the display with the current slider value
  });
  
}

// run the function!
speedSlider();

