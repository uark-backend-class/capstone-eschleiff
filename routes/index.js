const router = require('express').Router();
const launchController = require('../controllers/launches.controller');
const homeController = require('../controllers/home.controller');
const registerController = require('../controllers/register.controller');
const loginController = require('../controllers/login.controller');
const passport = require('passport.local');
const { route } = require('../app');

router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    });
router.get('/', homeController.homePage);
router.get('/launches', launchController.getLaunches);
router.get('/register', registerController.register);
router.post('/register', registerController.addUser)
router.get('/login', loginController.login);

module.exports = router;
