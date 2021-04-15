const passport = require('passport');
const mail = require('../handlers/mail');

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

exports.loginPage = (req, res) => {
    res.render('login', { user: req.user });
}

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Login Failed!',
    successRedirect: '/',
    successFlash: 'Successfully logged in!'
});

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are now logged out!');
    res.redirect('/login');
};

exports.email = async (req, res) => {
    await mail.send();
    req.flash('success', 'Email sent!')
    
}

// exports.googleAuth = (req, res) => {
//     res.flash('succes', 'Successfully logged in!');
//     res.redirect('/');
// }
