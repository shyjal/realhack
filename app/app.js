var Map = function() {
    var that = this;
    var defaultStyle = {
        "fillColor": "#1fc055",
        "weight": 1,
        "fillOpacity": 0.3,
        "color": '#000',
        "dashArray": "5"
    };
    var highlightStyle = {
        "fillColor": "#000",
        "weight": 1,
        "color": '#000',
        "dashArray": "5"
    };

    this.init = function(L) {
        L.mapbox.accessToken = 'pk.eyJ1Ijoic2h5amFsIiwiYSI6ImpKbDdtdkUifQ.8Re_EhWxVdbDtxQLPKcgEw';
        window.map = L.mapbox.map('map', 'examples.map-i86nkdio').setView([23.0000, 83.0000], 5);
        that.bindEvents();
    }

    this.bindEvents = function() {
        $('.use').click(function() {
            $('#interest_box').fadeOut(function() {
                $('#interest_box .row').html('<div class="col s4 shwmap xyz"><h1>HOUSE</h1></div><div class="col s4 shwmap"><h1>AGRI</h1></div><div class="col s4 shwmap"><h1>INDUSTRY</h1></div>');
                $('#interest_box').fadeIn();
            });
        });
        $('.shwmap').click(function() {
            $('#interest_box').fadeOut(function() {
                that.renderCountry();
            });
        });

    }


    this.renderCountry = function() {
        var country=L.geoJson(states, {

            style: function(feature) {
                return defaultStyle;
            },

            onEachFeature: function(feature, layer) {
                layer.on("mouseover", function(e) {

                    layer.setStyle(highlightStyle);

                });
                layer.on("click", function(e) {
                    map.removeLayer(country);
                    that.renderState();

                });

                layer.on("mouseout", function(e) {

                    layer.setStyle(defaultStyle);
                });
            }

        }).addTo(map);
    }
    this.renderState = function() {

        var state=L.geoJson(karnataka, {

            style: function(feature) {
                return defaultStyle;
            },

            onEachFeature: function(feature, layer) {
                layer.on("mouseover", function(e) {

                    layer.setStyle(highlightStyle);

                });
                layer.on("click", function(e) {
                     map.removeLayer(state);
                    that.renderDistrict();

                });

                layer.on("mouseout", function(e) {

                    layer.setStyle(defaultStyle);
                });
            }
        }).addTo(map);
        map.fitBounds(state.getBounds());
    }
    this.renderDistrict = function() {

        var district=L.geoJson(bangalore, {

            style: function(feature) {
                return defaultStyle;
            },

            onEachFeature: function(feature, layer) {
                layer.on("mouseover", function(e) {

                    layer.setStyle(highlightStyle);

                });
                layer.on("click", function(e) {
                     map.fitBounds(layer.getBounds());
                     that.showData();

                });

                layer.on("mouseout", function(e) {
                    layer.setStyle(defaultStyle);
                });
            }
        }).addTo(map);
        map.fitBounds(district.getBounds());
    }
    this.showData=function(){
        $('#data_box').fadeIn(function(){
            Materialize.showStaggeredList('#data-list');
        });
        
    }
}

var mapObj = new Map();
mapObj.init(L);