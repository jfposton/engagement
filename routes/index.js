var express = require('express');
var model = require('../model');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', model);
});

module.exports = router;
