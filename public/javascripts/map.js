if (google == undefined) {
    document.getElementById('location-map').appendChild("<h5>Unable to load the map :(</h5>");
} else {
    var map;

    var mapData = {
        "church": {
            "location": getLLObj(36.411266, -76.09243),
            "markerData": {
                position: getLLObj(36.411266, -76.09243),
                title: 'Providence Baptist Church'
            },
            infoWindowData: {
                content: "<h5>Providence Baptist Church</h5><p>765 Shawboro Rd, Shawboro, NC 27973</p>"
            },
            "window": null,
            "marker": null
        },
        "fairfieldInn": {
            "location": getLLObj(36.298611,-76.251678),
            "markerData": {
                position: getLLObj(36.298611,-76.251678),
                title: 'Fairfield Inn'
            },
            "infoWindowData":{
                content: "<h5><a href='http://www.marriott.com/hotels/travel/orfec-fairfield-inn-and-suites-elizabeth-city/'>Fairfield Inn</a></h5><p>1640 City Center Blvd, Elizabeth City, NC 27909</p>"
            },
            "window": null,
            "marker": null
        },
        "pines": {
            "location": getLLObj(36.3357959,-76.2374366),
            "markerData": {
                position: getLLObj(36.3357959,-76.2374366),
                title: 'The Pines at Elizabeth City'
            },
            "infoWindowData": {
                content: "<h5><a href='http://www.thepinesec.com/'>The Pines at Elizabeth City</a></h5><p>1525 N Rd St, Elizabeth City, NC 27909 </p>"
            },
            "window": null,
            "marker": null
        },
        "hamptoninn": {
            "location": getLLObj(36.2943617,-76.2459372),
            "markerData": {
                position: getLLObj(36.2943617,-76.2459372),
                title: "Hampton Inn"
            },
            "infoWindowData": {
                content: "<h5><a href='http://hamptoninn3.hilton.com/en/hotels/north-carolina/hampton-inn-elizabeth-city-ECGNCHX/index.html'>Hampton Inn</a></h5><p>402 Halstead Blvd, Elizabeth City, NC 27909</p>"
            }
        },
        "bestwestern": {
            "location": getLLObj(36.2904081,-76.2421385),
            "markerData": {
                position: getLLObj(36.2904081,-76.2421385),
                title: "Best Western"
            },
            "infoWindowData": {
                content: "<h5><a href='http://book.bestwestern.com/bestwestern/US/NC/Elizabeth-City-hotels/BEST-WESTERN-PLUS-Elizabeth-City-Inn---Suites/Hotel-Overview.do?propertyCode=34178'>Best Western</a></h5><p>848 Halstead Blvd, Elizabeth City, NC 27909</p>"
            }
        }
    }

    function getLLObj(lat, lng) {
        return new google.maps.LatLng(lat, lng);
    }

    function initMap() {
        var mapOptions = {
            center: mapData["church"]["location"],
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };
        
        var mapElement = document.getElementById("location-map");
        var $mapElement = $(mapElement);
        $mapElement.height($mapElement.width() * .50);
        map = new google.maps.Map(mapElement, mapOptions);

        for (name in mapData) {
            markerInfo = mapData[name]["markerData"];
            markerInfo["map"] = map;
            mapData[name]["marker"] = new google.maps.Marker(markerInfo);

            mapData[name]["window"] = new google.maps.InfoWindow(mapData[name]["infoWindowData"]);
        }

        mapData["church"]["window"].open(map, mapData["church"]["marker"]);
    }

    google.maps.event.addDomListener(window, 'load', initMap);

    function panToLocation(location) {
        map.panTo(mapData[location]["location"]);
    }

    $('.map-link').click(function (event) {
        if (map == undefined) {
            initMap();   
        }
        var target = event.currentTarget.getAttribute('data-loc');
        panToLocation(target);
        mapData[target]["window"].open(map, mapData[target]["marker"]);
        event.currentTarget.parentElement.parentElement.querySelector('.active').classList.remove('active');
        event.currentTarget.classList.add('active');
    });

    function displayAlert() {
        if ($(window).width() > 400) {
            $('.alert.alert-info').hide();
        }
    }

    $(window).on('load', displayAlert);
    $(window).resize(displayAlert);
}
