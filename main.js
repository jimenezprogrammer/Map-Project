var map = L.map('map').setView([36.7783,-119.4179],6);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiamltZW5lenByb2dyYW1tZXIiLCJhIjoiY2p5a2xscnYxMGZ1dzNobWo2ZHU4amdnMSJ9.Cx9OlTQCdz_pkWzngn0x2g'
}).addTo(map);
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';




// var goodWillIcon = L.icon({
//   iconUrl: 'url goes here',
//   ShadowUrl: 'url goes here',
//   iconSize:[20,20],
//   iconAnchor:[0,0],
//   shadowanchor:[20,20],
//   popupAnchor:[20,20]
// });
// var marker = L.marker([34.080998, -117.350164],{icon:goodWillIcon}).addTo(map);

function fetchData(){
  fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson")
  .then(function(response){
    return response.json();
  })
  .then(function(data){
//do sonmething with the FetchData
 function myloop(){
   for(i=0; i<data.features.length;i++){
     L.marker([data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]]).addTo(map);
   }
 }
 marker.bindPopup(.data.features[0].properties.mag+" "+.data.features[0].properties.name).openPopup();
 console.log(data);
console.log(.data.features[0].properties.mag+" "+.data.features[0].properties.name);
myloop();
});
}
fetchData();
