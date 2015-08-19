var express = require('express');
var common = require('./lib/commonFunctions');
var router = express.Router();

router.get(/^\/(story)?$/, common.renderTemplate('story'));
router.get('/bride', common.renderTemplate('bride'));
router.get('/groom', common.renderTemplate('groom'));
router.get('/bridalParty', common.renderTemplate('bridalParty'));
router.get('/groomsmen', common.renderTemplate('groomsmen'));
router.get('/location', common.renderTemplate('location'));
router.get('/registrations', common.renderTemplate('registrations'));
router.get('/gallery', common.renderTemplate('gallery'));

module.exports = router;
