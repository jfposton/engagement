var express = require('express');
var common = require('./lib/commonFunctions');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('engagement', 'engagement', 'password', {
        dialect: 'sqlite',
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        storage: __dirname + "/database.sqlite"
});

var Song = sequelize.define('song', {
    title: {
        type: Sequelize.STRING,
        unique: 'composite'
    },
    artist: {
        type: Sequelize.STRING,
        unique: 'composite'
    },
    count: {
        type: Sequelize.INTEGER
    }
});

Song.sync();


var router = express.Router();
router.get(/^\/(story)?$/, common.renderTemplate('story'));
router.get('/bride', common.renderTemplate('bride'));
router.get('/groom', common.renderTemplate('groom'));
router.get('/bridalParty', common.renderTemplate('bridalParty'));
router.get('/groomsmen', common.renderTemplate('groomsmen'));
router.get('/weddinginfo', common.renderTemplate('weddinginfo'));
router.get('/gallery', common.renderTemplate('gallery'));
router.get('/songsuggestions', function (req, res) {
    Song.findAll().then(function(songs) {
        res.json(songs);
    });
});
router.post('/songsuggestions', function (req, res) {
    var title = req.body.title;
    var artist = req.body.artist;
    if (!title || !artist) {
        res.status(400).json({
            reason: "Both artist and title are required",
        });
        return;
    }
    Song.sync().then(function() {
        Song.findOrCreate({
            where: {
                title: title,
                artist: artist
            }
        }).then(function(song) {
            var actualSong = song[0];
            if(actualSong.count == null) {
                actualSong.count = 0;
            }
            actualSong.count++;
            actualSong.save();
            res.json(actualSong);
        });
    });

});

module.exports = router;
