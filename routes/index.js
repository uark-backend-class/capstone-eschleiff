const router = require('express').Router();
const launchController = require('../controllers/launches.controller');

router.get('/', launchController.homePage);

router.get('/launches/upcoming', launchController.getLaunches)

module.exports = router;
