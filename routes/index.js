const router = require('express').Router();
const passport = require('passport');
const launchController = require('../controllers/launches.controller');
const homeController = require('../controllers/home.controller');
const registerController = require('../controllers/register.controller');
const auth = require('../controllers/auth.controller');
const { route } = require('../app');


router.get('/login', auth.loginPage);
router.post('/login', auth.login);
router.get('/register', registerController.register);
router.post('/register', registerController.addUser, auth.login);

// Must be an authorized User to use these routes
router.use(auth.isAuthenticated);
router.get('/', homeController.homePage);
router.get('/launches', launchController.getLaunches);

module.exports = router;
