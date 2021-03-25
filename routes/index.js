const router = require('express').Router();
const passport = require('passport');
const launchController = require('../controllers/launches.controller');
const homeController = require('../controllers/home.controller');
const registerController = require('../controllers/register.controller');
const loginController = require('../controllers/login.controller');
const { route } = require('../app');



router.get('/login', loginController.loginPage);
router.post('/login', loginController.login)
router.get('/', homeController.homePage);
router.get('/launches', launchController.getLaunches);
router.get('/register', registerController.register);
router.post('/register', registerController.addUser)

module.exports = router;
