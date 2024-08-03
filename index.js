var map = L.map('map').fitWorld();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'  
}).addTo(map);

var watchId;

function getLocation() {

  const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 30000
  };

  if (navigator.geolocation) {
    //navigator.geolocation.getCurrentPosition(showPosition,showError, options);
    watchId = navigator.geolocation.watchPosition(showPosition,showError, options);

  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
/*
  ele.innerHTML = "<h2>" +
                  "Latitude: " + position.coords.latitude + 
                  "<br>Longitude: " + position.coords.longitude + 
                  "<br>Accuracy: "+ position.coords.accuracy + " metres" + 
                  "</h2>";*/

    console.log(position.coords);
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var accuracy = position.coords.accuracy;

    var solidCircleOptions = {
        color: '#6203fc',
        fillColor: '#6203fc',
    }
    
    circleCenter = [lat,lon];
    var solidCircle = L.circle(circleCenter, 1, solidCircleOptions);
    var lightCircle = L.circle(circleCenter, accuracy);

    solidCircle.addTo(map)
    lightCircle.addTo(map)
    map.panTo(new L.LatLng(lat,lon));


}
function showError(error){
    alert(error.message);
}

getLocation();