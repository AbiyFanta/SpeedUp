// JavaScript code for route length and travel time calculation using Google Maps API
function calculateRoute() {
    // Get user-specified origin address
    var originAddress = document.getElementById('origin').value;
  
    // Set the destination address to UC Davis by default
    var destinationAddress = 'UC Davis, Davis, CA';
  
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
        document.getElementById('eta-difference').innerHTML = 'ETA Difference: ' + etaDifference.toFixed(2) + ' hours';
      } else {
        // Handle error cases
        document.getElementById('route-length').innerHTML = 'Error: ' + status;
        document.getElementById('normal-travel-time').innerHTML = '';
        document.getElementById('eta-difference').innerHTML = '';
      }
    });
  }
  