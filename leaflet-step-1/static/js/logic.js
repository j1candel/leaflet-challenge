let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let myMap = L.map("map", {
    center: [0,0],
    zoom: 2
})

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

function chooseColor(x) {
    switch (x) {
        case x < 1:
            return "yellow";
            break;
        case mag > 1 && mag < 2:
            return "orange";
            break;
        case mag > 2 && mag < 3:
            return "red";
            break;
        case mag > 3 && mag < 4:
            return "blue";
            break;
        case mag > 4 && mag < 5:
            return "blue";
            break;
        case mag > 5: 
            return "black"
    }
}

d3.json(queryUrl, function(data){
    
    
    
    for (var i = 0; i < data.features.length; i++) {

        earthquakeData = data.features[i]
        let lat = earthquakeData.geometry.coordinates[0]
        let long = earthquakeData.geometry.coordinates[1]
        let mag = earthquakeData.properties.mag
            
        L.circleMarker([long, lat],{
            radius : mag * 3
            ,color: chooseColor(mag)
            
        }).bindPopup("<h1>Earthquake Magnitude: " + earthquakeData.properties.mag + "</h1>"
        + "<h3>Nearest Location: " + earthquakeData.properties.place + "</h3>"
        + "<h3>Latitude: " + earthquakeData.geometry.coordinates[0] + "</h3>"
        + "<h3>Longitude: " + earthquakeData.geometry.coordinates[1] + "</h3>")
        .addTo(myMap)
    }
})