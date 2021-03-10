const router = require('express').Router();
const launchController = require('../controllers/launches.controller');
const homeController = require('../controllers/home.controller');

router.get('/', homeController.homePage);

router.get('/launches', launchController.getLaunches)

module.exports = router;
