var App = function() {
    var that = this;
    var country, state, district, layerSelected, lgroup;
    var defaultStyle = {
        "fillColor": "#1fc055",
        "weight": 1,
        "fillOpacity": 0.3,
        "color": '#7323dc',
        "dashArray": "5"
    };
    var highlightStyle = {
        "fillColor": "#000",
        "weight": 1,
        "color": '#000',
        "dashArray": "5"
    };

    this.init = function(L,document) {
        L.mapbox.accessToken = 'pk.eyJ1Ijoic2h5amFsIiwiYSI6ImpKbDdtdkUifQ.8Re_EhWxVdbDtxQLPKcgEw';
        window.map = L.mapbox.map('map', 'examples.map-i86nkdio').setView([23.0000, 83.0000], 5);
        that.bindEvents();
        lgroup = L.layerGroup().addTo(map);

        var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

        var barChartData = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
            {
                fillColor : "rgba(220,220,220,0.5)",
                strokeColor : "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            },
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,0.8)",
                highlightFill : "rgba(151,187,205,0.75)",
                highlightStroke : "rgba(151,187,205,1)",
                data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
            }
        ]

    }
    window.onload = function(){
    var ctx = document.getElementById("mapcanvas").getContext("2d");
        window.myBar = new Chart(ctx).Bar(barChartData, {
            responsive : true
        });
    }
    }

    this.bindStates = function(window) {
        $(window).hashchange(function() {

            var hash = location.hash.substring(2).split('/');
            hash = hash[0];
            console.log(hash)
            if (hash) {
                $('#interest_box').fadeOut();
                $('#use_box').fadeOut();
                $('.data_class').fadeOut();
                if (hash == "home") {
                    lgroup.clearLayers();
                    $('#interest_box').fadeIn();
                    map.setView([23.0000, 83.0000], 5);

                } else if (hash == "purpose-use") {
                    lgroup.clearLayers();
                    $('#use_box').fadeIn();
                    map.setView([23.0000, 83.0000], 5);
                } else if (hash == "map-india") {
                    lgroup.clearLayers();
                    that.renderCountry();
                } else if (hash == "map-karnataka") {
                    lgroup.clearLayers();
                    that.renderState();

                } else if (hash == "map-banglore") {
                    lgroup.clearLayers();
                    that.renderDistrict();

                } else if (hash == "map-layer") {
                    map.fitBounds(layerSelected.getBounds());
                    that.showData();
                    that.showAmenities();

                } else {

                }
            } else {
                parent.location.hash = '/home';
            }

        });

        $(window).hashchange();

    }

    this.bindEvents = function() {
        $('.use').click(function() {
            parent.location.hash = '/purpose-use';
        });
        $('.shwmap').click(function() {
            parent.location.hash = '/map-india';
        });

    }


    this.renderCountry = function() {
        country = L.geoJson(states, {

            style: function(feature) {
                return defaultStyle;
            },

            onEachFeature: function(feature, layer) {
                layer.on("mouseover", function(e) {

                    layer.setStyle(highlightStyle);

                });
                layer.on("click", function(e) {
                    parent.location.hash = '/map-karnataka';

                });

                layer.on("mouseout", function(e) {

                    layer.setStyle(defaultStyle);
                });
            }

        }).addTo(lgroup);
        map.setView([23.0000, 83.0000], 5);
    }
    this.renderState = function() {

        state = L.geoJson(karnataka, {

            style: function(feature) {
                return defaultStyle;
            },

            onEachFeature: function(feature, layer) {
                layer.on("mouseover", function(e) {

                    layer.setStyle(highlightStyle);

                });
                layer.on("click", function(e) {
                    parent.location.hash = '/map-banglore';

                });

                layer.on("mouseout", function(e) {

                    layer.setStyle(defaultStyle);
                });
            }
        }).addTo(lgroup);
        map.fitBounds(state.getBounds());
    }
    this.renderDistrict = function() {

        district = L.geoJson(bangalore, {

            style: function(feature) {
                return defaultStyle;
            },

            onEachFeature: function(feature, layer) {
                layer.on("mouseover", function(e) {

                    layer.setStyle(highlightStyle);

                });
                layer.on("click", function(e) {
                    layerSelected = layer;
                    parent.location.hash = '/map-layer';
                });

                layer.on("mouseout", function(e) {
                    layer.setStyle(defaultStyle);
                });
            }
        }).addTo(lgroup);
        map.fitBounds(district.getBounds());
    }
    this.showData = function() {
        $('.data_class').fadeIn(function() {
            Materialize.showStaggeredList('#data-list');
        });

    }

    this.showAmenities=function() {

        $( "#amenities li" ).hover(
          function() {
            $(this).find('p').fadeIn(200);
          }, function() {
            $(this).find('p').hide();
          }
        );
    }
}

var mapApp = new App();
window.onload = function(){
    mapApp.init(L,document);
    mapApp.bindStates(window);
}