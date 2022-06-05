//Create the tile layers for two different map types

let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
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
    Light: light,
    Dark: dark
};

let map = L.map("mapid", {
    center: [44, -80],
    zoom: 2,
    layers: [dark]
});

L.control.layers(baseMaps).addTo(map);

let torontoData = "https://raw.githubusercontent.com/Mots94/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

let myStyle = {
    color: "#fffa1",
    weight: 2
}

d3.json(torontoData).then(function(data) {
    console.log(data);

    //Create GeoJSON layer with retrieved data
    L.geoJSON(data, {
        color:"#ffffa1",
        weight: 2,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h2>Airline: ${feature.properties.airline}</h2><hr><h4>Destination: ${feature.properties.dst}</h4>`).addTo(map);
        }
    }).addTo(map);
         
});


