var map;
var locationTrackLayers;
var solidCircle;
var lightCircle;
var watchId;
var lat;
var lon;
var accuracy;
var solidCircleOptions = {
    color: '#6203fc',
    fillColor: '#6203fc',
    fillOpacity: 10
}

function watchLocation(){
    const options = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 30000
    };

    if (navigator.geolocation){
        watchId = navigator.geolocation.watchPosition(showPosition,showError, options);
    }
    else { 
        alert("Geolocation is not supported by this browser.");
    }

}

function showPosition(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    accuracy = position.coords.accuracy;

    if(!map){
        map = L.map('map',{center:[lat,lon],zoom:16});
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(map);
        solidCircle = L.circle([lat,lon], 1, solidCircleOptions);
        lightCircle = L.circle([lat,lon], accuracy);
        locationTrackLayers = L.layerGroup([solidCircle,lightCircle]);
        locationTrackLayers.addTo(map);
        return;
    }
    
    locationTrackLayers.removeLayer(solidCircle);
    locationTrackLayers.removeLayer(lightCircle);
    solidCircle = L.circle([lat,lon], 1, solidCircleOptions);
    lightCircle = L.circle([lat,lon], accuracy);
    locationTrackLayers.addLayer(solidCircle);
    locationTrackLayers.addLayer(lightCircle);    
    map.panTo(new L.LatLng(lat,lon));
}

function showError(error){
    alert(error.message);
}

watchLocation()
