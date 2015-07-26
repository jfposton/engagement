var express = require('express');
var model = require('./model');
var router = express.Router();

function renderTemplate(template) {
    return function(req, res) {
        res.render(template, model(template));
    };
}

router.get(/^\/(story)?$/, renderTemplate('story'));
router.get('/bride', renderTemplate('bride'));
router.get('/groom', renderTemplate('groom'));
router.get('/bridalParty', renderTemplate('bridalParty'));
router.get('/groomsmen', renderTemplate('groomsmen'));
router.get('/location', renderTemplate('location'));
router.get('/registrations', renderTemplate('registrations'));
router.get('/gallery', renderTemplate('gallery'));

module.exports = router;
