function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(36.411266, -76.09243),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    };
    var map = new google.maps.Map(document.getElementById("location-map"), mapOptions);

    var marker = new google.maps.Marker({
        position: mapOptions.center,
        map: map,
        title: 'Providence Baptist Church'
    });

    var infoWindow = new google.maps.InfoWindow({
        content: "<h5><u>Providence Baptist Church</u></h5><p>765 Shawboro Rd, Shawboro, NC 27973</p>"
    });

    infoWindow.open(map, marker);
}

google.maps.event.addDomListener(window, 'load', initMap);


function initHeadroom() {
    var headroom = new Headroom(document.querySelector(".navbar"), {
      "offset": 205,
      "tolerance": 5,
      "classes": {
        "initial": "animated",
        "pinned": "flipInX",
        "unpinned": "flipOutX"
      }
    });
    headroom.init();
}

initHeadroom();
