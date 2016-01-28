var fs = require('fs');
var readChunk = require('read-chunk');
var imageType = require('image-type');

function isProduction() {
    return process.env.NODE_ENV === 'production';
}
function gatherPhotos(sourcePath) {
    var result = [];
    fs.readdirSync('public/' + sourcePath).forEach(function(currentItem) {
        var buffer = readChunk.sync('public/' + sourcePath + currentItem, 0, 12);
        if (imageType(buffer) !== null) {
            result.push(imageBasePath() + sourcePath + currentItem);
        }
    });
    return result;
}

function imageBasePath() {
    var path = "";
    return path;
}

function common() {
    var appExtenstionPrefix = isProduction() ? '.min' : '';
    return {
        head: {
            title: "Toast to Poston",
            link: [
                "vendor/bootstrap/dist/css/bootstrap.min.css",
                "vendor/animate.css/animate.min.css",
                "stylesheets/site" + appExtenstionPrefix + ".css",
                "stylesheets/photos" + appExtenstionPrefix + ".css"
            ]
        },
        scripts: [
            "vendor/jquery/dist/jquery.min.js",
            "vendor/bootstrap/dist/js/bootstrap.min.js",
            "vendor/stellar.js/jquery.stellar.min.js",
            "vendor/headroom.js/dist/headroom.min.js",
            "vendor/masonry/dist/masonry.pkgd.js",
            "javascripts/site" + appExtenstionPrefix + ".js",
        ],
        imageBasePath: imageBasePath()
    };
}

function weddingInfo() {
    var appExtenstionPrefix = isProduction() ? '.min' : '';
    var commonData = setImagePath("images/weddinginformation.jpg");
    var requiredScripts = [
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDYeAbSkSOLay6SjLAAldJlOPpKjdktwF4",
        "javascripts/map" + appExtenstionPrefix + ".js"
    ];
    requiredScripts.forEach(function(currentValue) {
        commonData.scripts.push(currentValue);
    });

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
    commonData.galleryPhotos = gatherPhotos('images/gallery/');
    return commonData;
}

var pages = {
    story: function() {return setImagePath("images/ourstory.jpg");},
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
                "title": "Thinking Out Loud by Ed Sheeran",
                "video": "https://youtube.com/embed/lp-EO5I60KA"
            },
            {
                "title": "Young Hearts by Search the City",
                "video": "https://youtube.com/embed/ePA275T57PE"
            }
        ];
        data.bridephotos = gatherPhotos('images/bridephotos/');
        return data;
    },
    groom: function() {
        var data = setImagePath("images/groom.jpg");
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
        data.bridephotos = gatherPhotos('images/groomphotos/');
        return data;
    },
    bridalParty: function() {return setImagePath("images/bridesmaids.JPG");},
    groomsmen: function() {return setImagePath("images/groomsmen.jpg");},
    error: common,
    weddinginfo: weddingInfo,
    gallery: gallery,
    credits: function() {return common();},
};

module.exports = function (page) {
    return pages[page]();
};
