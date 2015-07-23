var assert = require("assert");
var model = require('../model');
var merge = require('merge');

function commonData() {
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
    };
}


describe('model', function() {
    describe('#()', function () {
        it('should return the common dataset for the error template', function () {
            assert.deepEqual(commonData(), model('error'));
        });
        it('show NOT return the common dataset for the story, bride, groom, bridalParty, groomsmen, or location templates', function() {
            var templates = [ 'story', 'bride', 'groom', 'bridalParty', 'groomsmen', 'location'];
            for (template in templates) {
                assert.notDeepEqual(commonData(), model(template));
            }
        });
        it('should return the common dataset with an imagePath for the story template', function () {
            commonData().imagePath = "images/main-v1.png";
            assert.deepEqual(commonData(), model('story'));
        });
        it('should return the common dataset with an imagePath for the bride template', function () {
            commonData().imagePath = "images/bride.jpg";
            assert.deepEqual(commonData(), model('bride'));
        });
        it('should return the common dataset with an imagePath for the groom template', function () {
            commonData().imagePath = "images/groom.png";
            assert.deepEqual(commonData(), model('groom'));
        });
        it('should return the common dataset with an imagePath for the bridalParty template', function () {
            commonData().imagePath = "images/main4.JPG";
            assert.deepEqual(commonData(), model('bridalParty'));
        });
        it('should return the common dataset with an imagePath for the groomsmen template', function () {
            commonData().imagePath = "images/main3.JPG";
            assert.deepEqual(commonData(), model('groomsmen'));
        });
        it('should return the common dataset with google api scripts for the location template', function () {
            merge(commonData().scripts, [
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyDYeAbSkSOLay6SjLAAldJlOPpKjdktwF4",
                "javascripts/map.js"
            ]);
            assert.deepEqual(commonData(), model('location'));
        });
    });
});
