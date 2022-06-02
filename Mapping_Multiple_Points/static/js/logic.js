// Add console.log to check to see if our code is working

console.log("working");

//Create the map object wtih a center and zoom level

let map = L.map("mapid").setView([40.7, -94.5], 4);

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

let cityData = cities;

// Loop through cities array and create one marker for each city
cityData.forEach(function(city) {
    console.log(city)
    L.marker(city.location)
    .bindPopup(`<strong>City: ${city.city}</strong> <hr> <strong>Population: ${city.population}</strong>`)
    .addTo(map);
});