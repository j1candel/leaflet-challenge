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
    
    earthquakeData = data.features
    console.log(earthquakeData)
    
    for (var i = 0; i < earthquakeData.length; i++) {

    let lat = earthquakeData[i].geometry.coordinates[0]
    let long = earthquakeData[i].geometry.coordinates[1]
    let mag = earthquakeData[i].properties.mag
    
    

    }
})
