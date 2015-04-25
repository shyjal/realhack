var Map = function() {
    var that = this;
    this.init=function(L){
        L.mapbox.accessToken = 'pk.eyJ1Ijoic2h5amFsIiwiYSI6ImpKbDdtdkUifQ.8Re_EhWxVdbDtxQLPKcgEw';
        window.map = L.mapbox.map('map', 'examples.map-i86nkdio').setView([23.0000, 83.0000], 5);
        that.bindEvents();
    }

    this.bindEvents = function() {
        $('.use').click(function() {
            $('#interest_box').fadeOut(function() {
                $('#interest_box .row').html('<div class="col s4 shwmap"><h1>HOUSE</h1></div><div class="col s4 shwmap"><h1>AGRI</h1></div><div class="col s4 shwmap"><h1>INDUSTRY</h1></div>');
                $('#interest_box').fadeIn();
            });
        });
        $('.shwmap').click(function() {
            $('#interest_box').fadeOut(function() {
                that.start();
            });
        });

    }
    this.onEachFeature = function(feature, layer) {
/*
        layer.bindPopup(popupContent);*/
    }

    this.start = function() {

        L.geoJson(karnataka, {

            style: function(feature) {
                return {
                    color: "#000",
                    "weight": 1,
                    "opacity": 0.2,
                    "dashArray": "3"
                };
            },

            onEachFeature: this.onEachFeature,

        }).addTo(map);
    }
}

var mapObj=new Map();
mapObj.init(L);