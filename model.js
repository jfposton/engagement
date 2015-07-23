var merge = require('merge');
function common() {
    return {
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
}

var location = function() {
    var commonData = common();
    merge(commonData.scripts, [
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDYeAbSkSOLay6SjLAAldJlOPpKjdktwF4",
        "javascripts/map.js"
    ]);
    return commonData;
}

function setImagePath(imagePath)
{
    var commonData = common();
    commonData.imagePath = imagePath;
    return commonData;
}

var pages = {
    story: setImagePath("images/main-v1.png"),
    bride: setImagePath("images/bride.jpg"),
    groom: setImagePath("images/groom.png"),
    bridalParty: setImagePath("images/main4.JPG"),
    error: common(),
    location: location()
}

module.exports = function (page) {
    return pages[page];
}
