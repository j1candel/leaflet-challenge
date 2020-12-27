let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let myMap = L.map("map", {
    center: [0,0],
    zoom: 5
})

d3.json(queryUrl, function(data){
    console.log(data.features)
})
