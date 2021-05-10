const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/News');
const utils = require('../Utils');

router.get('/searchHeadline',utils.checkCache,ctrl.searchHeadline);
router.get('/topHeadlines', ctrl.topHeadlines);
router.get('/getWeatherInfo', ctrl.getWeatherInfo);

module.exports = router;