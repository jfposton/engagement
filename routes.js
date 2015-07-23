var express = require('express');
var model = require('./model');
var router = express.Router();

function renderTemplate(template) {
    return function(req, res, next) {
        res.render(template, model(template));
    }
}

router.get(/^\/(story)?$/, renderTemplate('story'));
router.get('/bride', renderTemplate('bride'));
router.get('/groom', renderTemplate('groom'));
router.get('/bridalParty', renderTemplate('bridalParty'));
router.get('/groomsmen', renderTemplate('groomsmen'));

module.exports = router;
