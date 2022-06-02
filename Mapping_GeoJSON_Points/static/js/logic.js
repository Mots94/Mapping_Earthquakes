// Add console.log to check to see if our code is working

console.log("working");

//Create the map object wtih a center and zoom level

let map = L.map("mapid").setView([37.6213, -122.3790], 5);

let line = [
    [37.6213, -122.3790],
    [30.2021, -97.6665],
    [43.6855, -79.6208],
    [40.6435, -73.7820]
];

let cityData = cities;

L.polyline(line, {
    color: "blue",
    dashArray: "20, 20",
    weight: 4,
    opacity: 0.5

}).addTo(map);

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);





