var merge = require('merge');
var common = {
    head: {
        title: "Toast to Poston",
        link: [
            "vendor/bootstrap/dist/css/bootstrap.min.css",
            "vendor/animate.css/animate.min.css",
            "stylesheets/site.css",
        ]
    },
    scripts: [
        "vendor/jquery/dist/jquery.min.js",
        "vendor/bootstrap/dist/js/bootstrap.min.js",
        "vendor/stellar.js/jquery.stellar.min.js",
        "vendor/headroom.js/dist/headroom.min.js",
        "javascripts/site.js",
    ]
}

var location = function() {
    merge(common.scripts, [
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDYeAbSkSOLay6SjLAAldJlOPpKjdktwF4",
        "javascripts/map.js"
    ]);
    return common;
}

var pages = {
    story: common,
    bride: common,
    groom: common,
    weddingParty: common,
    error: common,
    location: location()
}

module.exports = function (page) {
    return pages[page];
}
