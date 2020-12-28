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


d3.json(queryUrl, function(data){
    
    function chooseColor(x) {
        if (x < 1){
            return "yellow"
        }
        else if (x < 2){
            return "red"
        }
        else if (x < 3){
            return "orange"
        }
        else if (x < 4){
            return "green"
        }
        else if (x < 5){
            return "blue"
        }
        else {
            return "black"
        }
    }

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

    function getColor(d) {
        return d < 2  ? 'yellow':
               d < 3  ? 'red':
               d < 4  ? 'orange':
               d < 5  ? 'green':
               d < 6  ? 'blue':
                        'black';
    }
    
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = ["Magnitude"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};legend.addTo(map);

})