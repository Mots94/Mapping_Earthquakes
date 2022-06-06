//Create the tile layers for two different map types

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey
});

let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey
});

//Create base layer that holds both maps

let baseMaps = {
    Streets: streets,
    Satellite: satellite
};

//Create earthquake layer for the map
let earthquakes = new L.layerGroup();

//Adding layer for tectonic plate data
let plates = new L.layerGroup();

let majorQuakes = new L.layerGroup();

//Defining an overlay that can be visible at all times
let overlays = {
    Earthquakes: earthquakes,
    Tectonic_Plates: plates,
    Major_Earthquakes: majorQuakes
}

let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

L.control.layers(baseMaps, overlays).addTo(map);

let earthquake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

let plateData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

let majorQuakesData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"


d3.json(earthquake).then(function(data) {
    console.log(data);

    //Create GeoJSON layer with retrieved data
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<strong>Magnitude: ${feature.properties.mag}</strong><hr><strong>Location: ${feature.properties.place}</strong>`)
        }
    }).addTo(earthquakes);

    earthquakes.addTo(map);

    let legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
   

        const magnitudes = [0, 1, 2, 3, 4, 5];
        const colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
            ];

        for (var i = 0; i < magnitudes.length; i++) {

            div.innerHTML +=
                "<i style='background: " + colors[i] + "'></i> " +
                magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
        }
        return div;
    };

    legend.addTo(map);
  

    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
      
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }

        return magnitude * 4;
    }

    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#d4ee00";
        }
        if (magnitude > 1) {
            return "#98ee00";
        }
    }
});

d3.json(plateData).then(function(data) {
    console.log(data);

    L.geoJSON(data, {
        color: "purple",
        weight: 3
    }).addTo(plates);

    plates.addTo(map);
});

d3.json(majorQuakesData).then(function(data) {
    console.log(data);

     //Create GeoJSON layer with retrieved data
     L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<strong>Magnitude: ${feature.properties.mag}</strong><hr><strong>Location: ${feature.properties.place}</strong>`)
        }
    }).addTo(majorQuakes);

    majorQuakes.addTo(map);

    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
      
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }

        return magnitude * 4;
    }

    function getColor(magnitude) {
        if (magnitude > 6) {
            return "#581845";
        }
        if (magnitude > 5) {
            return "#900C3F";
        }
        if (magnitude > 1) {
            return "#C70039";
        }
    }
});


