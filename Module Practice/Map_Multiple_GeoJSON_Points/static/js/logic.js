//Create the map object wtih a center and zoom level
let map = L.map("mapid").setView([30, 30], 2);

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

let airportData = "https://raw.githubusercontent.com/Mots94/Mapping_Earthquakes/Map_Multiple_GeoJSON_Points/Map_Multiple_GeoJSON_Points/majorAirports.json";

d3.json(airportData).then(function(data) {
    console.log(data);

    //Create GeoJSON layer with retrieved data
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            console.log(layer);
            layer.bindPopup(`<h2>Airport code: ${feature.properties.faa}</h2><hr><h4>Airport name: ${feature.properties.name}</h4>`).addTo(map);
        }
    }).addTo(map);
         
});





