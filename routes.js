var express = require('express');
var common = require('./lib/commonFunctions');

common.setupDatabase();

var router = express.Router();
router.get(/^\/(story)?$/, common.renderTemplate('story'));
router.get('/bride', common.renderTemplate('bride'));
router.get('/groom', common.renderTemplate('groom'));
router.get('/bridalParty', common.renderTemplate('bridalParty'));
router.get('/groomsmen', common.renderTemplate('groomsmen'));
router.get('/weddinginfo', common.renderTemplate('weddinginfo'));
router.get('/gallery', common.renderTemplate('gallery'));
router.get('/credits', common.renderTemplate('credits'));

router.get('/songsuggestions', function (req, res) {
    common.Song.findAll().then(function(songs) {
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
    common.Song.addSong(title, artist).then(function(song) {
        res.json(song);
    });
});

module.exports = router;
