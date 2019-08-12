function htmlbodyHeightUpdate() {
    var height3 = $(window).height();
    var height1 = $('.nav').height() + 50;
    height2 = $('.container-main').height();
    if (height2 > height3) {
        $('html').height(Math.max(height1, height3, height2) + 10);
        $('body').height(Math.max(height1, height3, height2) + 10);
    } else
    {
        $('html').height(Math.max(height1, height3, height2));
        $('body').height(Math.max(height1, height3, height2));
    }

}
$(document).ready(function () {
    htmlbodyHeightUpdate();
    $(window).resize(function () {
        htmlbodyHeightUpdate();
    });
    $(window).scroll(function () {
        height2 = $('.container-main').height();
        htmlbodyHeightUpdate();
    });
});
var map = L.map('mymap').setView([34.1, -117.28], 7);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: "pk.eyJ1Ijoiam9ydGVnYWhvbWVzIiwiYSI6ImNqeWtsbXIwODBmcmczbW9iYTcycmUycXIifQ.YQcwA678CCL-sQwDDMh49g"
}).addTo(map);

var mapLayer;
var yellowMarker = L.icon({
  iconUrl: 'https://media.discordapp.net/attachments/604422860043452498/606970037936324640/yellow.png?width=507&height=507',
  iconSize: [20, 20],
  iconAnchor: [0, 0],
  popupAnchor: [6, 0]
})
var redMarker = L.icon({
  iconUrl: 'red.png',
  iconSize: [12, 12],
  iconAnchor: [0, 0],
  popupAnchor: [6, 0]
})
var orangeMarker = L.icon({
  iconUrl: 'orange.png',
  iconSize: [12, 12],
  iconAnchor: [0, 0],
  popupAnchor: [6, 0]
})
var greenMarker = L.icon({
  iconUrl: "https://media.discordapp.net/attachments/604422860043452498/606970036187299845/green.png?width=507&height=507",
  iconSize: [20, 20],
  iconAnchor: [0, 0],
  popupAnchor: [6, 0]
})
//  L.marker([34,-117.5], {icon: greenMarker}).addTo(map);

function fetchData() {
  fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson") //link used to "fetch the data"
    .then(function(response) { //tcreate a funciton to remove the data,
      return response.json(); // we tell the computer that this data is called .json
    })
    .then(function(data) { //creates new funciton to console log the data

      function switchIcons(feature, latlng) {
        switch (feature.properties.alert) {
          case 'green':
            return L.marker(latlng, {
              icon: greenMarker
            })
       };
       switch(feature.properties.alert) {
         case 'yellow':
         return L.marker(latlng, {
           icon: yellowMarker
         })
       };
       switch(feature.properties.alert) {
         case 'orange':
         return L.marker(latlng, {
           icon: orangeMarker
         })
       };
       switch(feature.properties.alert) {
         case 'red':
         return L.marker(latlng, {
           icon: redMarker
         })
       };
   }    //end of switch bracket
      mapLayer = L.geoJSON(data, {
        pointToLayer: switchIcons,
        onEachFeature: function(features, mapLayer) {
          mapLayer.bindPopup('<p><b>Magnitude: </b>' + features.properties.mag + '<br><b>Location: </b>' + features.properties.place + '<br><b> Alert: </b>' + features.properties.alert + '<br></p>');
        }
      })
    })
}
fetchData();

const fetchButton = document.getElementById("myCheck");

fetchButton.addEventListener('click', function() {
  if (fetchButton.checked === true) {
    mapLayer.addTo(map);
  } else {
    map.removeLayer(mapLayer);
  }
})


L.control.mousePosition().addTo(map);
