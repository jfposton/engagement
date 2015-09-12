var express = require('express');
var common = require('./lib/commonFunctions');
var router = express.Router();

router.get(/^\/(story)?$/, common.renderTemplate('story'));
router.get('/bride', common.renderTemplate('bride'));
router.get('/groom', common.renderTemplate('groom'));
router.get('/bridalParty', common.renderTemplate('bridalParty'));
router.get('/groomsmen', common.renderTemplate('groomsmen'));
router.get('/weddinginfo', common.renderTemplate('weddinginfo'));
router.get('/gallery', common.renderTemplate('gallery'));

module.exports = router;
