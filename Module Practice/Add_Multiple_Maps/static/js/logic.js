//Create the tile layers for two different map types

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey
});

//Create base layer that holds both maps

let baseMaps = {
    Street: streets,
    Dark: dark
};

let map = L.map("mapid", {
    center: [40.7, -94.5],
    zoom: 4,
    layers: [streets]
});

L.control.layers(baseMaps).addTo(map);

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


