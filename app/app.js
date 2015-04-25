L.mapbox.accessToken = 'pk.eyJ1Ijoic2h5amFsIiwiYSI6ImpKbDdtdkUifQ.8Re_EhWxVdbDtxQLPKcgEw';
var map = L.mapbox.map('map', 'examples.map-i86nkdio')
    .setView([12.933637,77.614497], 15);

overlayPane = {
  "Endpoints" : endpointMarkerLayer,
  "Links" : linkLineLayer,
};

// Add a layer control element to the map
layerControl = L.control.layers(null, overlayPane, {position: 'topright'});
layerControl.addTo(map);