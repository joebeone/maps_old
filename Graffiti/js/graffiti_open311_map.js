/**
 * Created with maps.
 * User: joebeone
 * Date: 2014-12-05
 * Time: 04:11 AM
 * To change this template use Tools | Templates.
 */
// Data orgin: http://grcity.spotreporters.com/open311/v2/requests.json?service_code=4e81abbf21ecf34d2600001a&status=closed&start_date=2010-01-01T00:00:00Z&end_date=2015-01-01T00:00:00Z
var map = L.map('map', {
    center: [42.96125, -85.655719],
    zoom: 13
});
//Add OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);



var addGraffiti = function(data) {
       
    var graffiti_heat_layer = L.heatLayer([]);
    
    for (i=1; i < data.length; i++){
        var media_url = "";
        var description = "";
        
        if (typeof(data[i].media_url) == "undefined"){
            media_url = "/Graffiti/img/graffiti_default.png";
        } else {
            media_url = data[i].media_url;
        }
    
            
        if (typeof(data[i].description) == "undefined"){
            description = "No description provided.";
        } else{
            description = data[i].description;
        }
        
        graffiti_heat_layer.addLatLng([parseFloat(data[i].lat), parseFloat(data[i].long)]);
        L.marker([parseFloat(data[i].lat), parseFloat(data[i].long)], {opacity:0}).bindPopup(
            '<img width="200px" height="200px" src="' + media_url+ '"><br><p>' + description +'</p>', {autoPan:false}).addTo(map);
    }
    graffiti_heat_layer.addTo(map);  
}
var loadData = function(callback) {
    $.getJSON('../Graffiti/data/graffiti_request.json', function(data) {
        callback(data);
    })
}
loadData(addGraffiti);