var fs = require('fs');
var readChunk = require('read-chunk');
var imageType = require('image-type');

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
            "vendor/masonry/dist/masonry.pkgd.js",
            "javascripts/site.js",
        ]
    };
}

function location() {
    var commonData = setImagePath("images/location.jpg");
    var requiredScripts = [
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDYeAbSkSOLay6SjLAAldJlOPpKjdktwF4",
        "javascripts/map.js"
    ];
    requiredScripts.forEach(function(currentValue) {
        commonData.scripts.push(currentValue);
    });
    return commonData;
}

function setImagePath(imagePath)
{
    var commonData = common();
    commonData.imagePath = imagePath;
    return commonData;
}

function gallery()
{
    var commonData = common();
    commonData.galleryPhotos = [];
    fs.readdirSync('public/images/gallery').forEach(function(currentItem) {
        var buffer = readChunk.sync('public/images/gallery/' + currentItem, 0, 12);
        if (imageType(buffer) !== null) {
            commonData.galleryPhotos.push('images/gallery/' + currentItem);
        }
    });
    return commonData;
}

var pages = {
    story: function() {return setImagePath("images/ourstory.png");},
    bride: function() {return setImagePath("images/bride.jpg");},
    groom: function() {return setImagePath("images/groom.png");},
    bridalParty: function() {return setImagePath("images/bridesmaids.JPG");},
    groomsmen: function() {return setImagePath("images/groomsmen.jpg");},
    error: common,
    location: location,
    gallery: gallery,
    registrations: common,
};

module.exports = function (page) {
    return pages[page]();
};
