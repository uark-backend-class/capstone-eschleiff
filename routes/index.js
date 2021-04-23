const router = require('express').Router();
const passport = require('passport');
const launchController = require('../controllers/launches.controller');
const homeController = require('../controllers/home.controller');
const registerController = require('../controllers/register.controller');
const auth = require('../controllers/auth.controller');
const { catchErrors } = require('../handlers/errorHandlers');
const { route } = require('../app');


router.get('/login', auth.loginPage);
router.post('/login', auth.login);
router.get('/register', registerController.registerPage);
router.post('/register', 
    registerController.validateRegister, 
    registerController.addUser, 
    auth.login
);
// google oauth
router.get('/auth/google', passport.authenticate('google', { 
    scope: ['profile', 'email']
}));
router.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'You have successfully logged in!');
    res.redirect('/');
});
// github oauth
router.get('/auth/github', passport.authenticate('github', { 
    scope: [ 'user:email' ]
}));
router.get('/auth/github/redirect', passport.authenticate('github',{ failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'You have successfully logged in!');
    res.redirect('/');
})
// facebook oauth
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/redirect', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'You have successfully logged in!');
    res.redirect('/');
});

// Must be a User/logged-in to use these routes
router.use(auth.isAuthenticated);
router.get('/', catchErrors(homeController.homePage));
router.get('/profile', homeController.profile);
router.post('/profile', catchErrors(homeController.updateProfile));
router.get('/launches', catchErrors(launchController.getLaunches));
router.get('/upcoming', catchErrors(launchController.getUpcomingLaunches));
router.get('/currentinfo', homeController.currentLaunch);
router.get('/logout', auth.logout);

module.exports = router;