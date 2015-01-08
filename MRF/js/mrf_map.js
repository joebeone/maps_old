/**
* User: Joe Bennett
* Date: 2014-12-04
* Time: 09:02 PM
* Creates a leaflet map of all Material Recovery Facilities in the United States
*/


//create map centered on the contiguous United States.
var map = L.map('map', { 
                        center: [39.828127, -98.579404], 
                        zoom : 4 
                });

//Add OpenStreetMap tile layer

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

//create recycle icon with bootstrap

var recycle_icon = L.AwesomeMarkers.icon({
    
    icon: 'refresh', 
    markerColor:  'green'
    
});


//add MRF layer

addMRFLayer = function(data){
    //create cluster group
    var mrf_markers = new L.MarkerClusterGroup();  
    
  //interate the geojson layer and add facilities to mrf_markers cluster group
  for (var i = 0; i < data.features.length; i++){
      var facility = data.features[i];
      var title = facility.properties.LOCATION_ADDRESS;
      var mrf_marker = new L.Marker(new L.LatLng(facility.geometry.coordinates[1], facility.geometry.coordinates[0]), {title: title, icon: recycle_icon});
      mrf_marker.bindPopup('<b>' + title +
                           '</b><br><br><i>Coordinates:</i>' 
                           + facility.geometry.coordinates[1] + 
                           ',' + facility.geometry.coordinates[0] 
                          );
      mrf_markers.addLayer(mrf_marker);
      
  }   
    
  //add mrf_markers cluster group to the map
  map.addLayer(mrf_markers);
 
    
  
    
} 


//function will load MRF facilities
var loadData = function(callback){ $.getJSON('../MRF/data/MRF_Facilites.geojson', function(data){
    
    //#TODO: Add error check....
                         callback(data);
                        
                         });
                          
                      }
    
loadData(addMRFLayer);


