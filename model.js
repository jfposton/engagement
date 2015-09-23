var fs = require('fs');
var readChunk = require('read-chunk');
var imageType = require('image-type');
function imageBasePath() {
    var path = "";
    if (process.env.NODE_ENV === 'production') {
        path = "https://raw.githubusercontent.com/jfposton/engagement/master/public/";
    }
    return path;
}

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
        ],
        imageBasePath: imageBasePath()
    };
}

function weddingInfo() {
    var commonData = setImagePath("images/location.jpg");
    var requiredScripts = [
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDYeAbSkSOLay6SjLAAldJlOPpKjdktwF4",
        "javascripts/map.js"
    ];
    requiredScripts.forEach(function(currentValue) {
        commonData.scripts.push(currentValue);
    });

    // expecting { 'image': "<path to image>", 'registration': "<path to registration>"}
    commonData.registrations = [];
    return commonData;
}

function setImagePath(imagePath)
{
    var commonData = common();
    commonData.showcaseImagePath = imageBasePath() + imagePath;
    return commonData;
}

function gallery()
{
    var commonData = common();
    commonData.galleryPhotos = [];
    fs.readdirSync('public/images/gallery').forEach(function(currentItem) {
        var buffer = readChunk.sync('public/images/gallery/' + currentItem, 0, 12);
        if (imageType(buffer) !== null) {
            commonData.galleryPhotos.push(imageBasePath() + 'images/gallery/' + currentItem);
        }
    });
    return commonData;
}

var pages = {
    story: function() {return setImagePath("images/ourstory.png");},
    bride: function() {

        var data = setImagePath("images/bride.jpg");

        data.songs = [
            {
                "title": "The Beginning (A Simple Seed) by The Classic Crime",
                "video": "https://www.youtube.com/embed/pn29dSi97VA"
            },
            {
                "title": "Giving It All (To You) by Haley & Michaels",
                "video": "https://youtube.com/embed/x560u5Enf-4"
            },
            {
                "title": "Here by Rascal Flatts",
                "video": "https://youtube.com/embed/R_q84a86LIA"
            },
            {
                "title": "Bless the Broken Road by Rascal Flatts",
                "video": "https://youtube.com/embed/Do32g82qilk"
            },
            {
                "title": "Home by Edward Sharpe & The Magnetic Zeros",
                "video": "https://youtube.com/embed/DHEOF_rcND8"
            },
            {
                "title": "Lucky by Jason Mraz",
                "video": "https://youtube.com/embed/JNA15rXSxOI"
            },
            {
                "title": "Thinking Out Loud by Ed Sheeran",
                "video": "https://youtube.com/embed/lp-EO5I60KA"
            },
            {
                "title": "Young Hearts by Search the City",
                "video": "https://youtube.com/embed/ePA275T57PE"
            }
        ];
        return data;
    },
    groom: function() {
        var data = setImagePath("images/groom.png");
        data.songs = [
            {
                "title": "Summer Song By Wavorly",
                "video": "https://www.youtube.com/embed/qqAFf5LAsV0"
            },
            {
                "title": "Best Thing By Relient K",
                "video": "https://www.youtube.com/embed/KhR-2phsGdA"
            },
            {
                "title": "Every Little Thing By Hawk Nelson",
                "video": "https://www.youtube.com/embed/Sb9Ch8g3hfY"
            },
            {
                "title": "Perfect Chemistry By Nevertheless",
                "video": "https://www.youtube.com/embed/PUCgmhc2A5g"
            },
            {
                "title": "I'm Taking You with Me By Relient K",
                "video": "https://www.youtube.com/embed/CvG5TLd8yGc"
            },
            {
                "title": "Bright by Echosmith",
                "video": "https://www.youtube.com/embed/kMAzstG5O7E"
            }
        ];
        return data;
    },
    bridalParty: function() {return setImagePath("images/bridesmaids.JPG");},
    groomsmen: function() {return setImagePath("images/groomsmen.jpg");},
    error: common,
    weddinginfo: weddingInfo,
    gallery: gallery,
};

module.exports = function (page) {
    return pages[page]();
};
