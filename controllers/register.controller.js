const User = require('../models/users.model');

exports.registerPage = (req, res) => {
    
    res.render('register')

};

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('firstName');
    req.sanitizeBody('lastName');
    req.checkBody('firstName', 'You must supply a first name!').notEmpty();
    req.checkBody('lastName', 'You must supply a last name!').notEmpty();
    req.checkBody('email', 'That email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        gmail_remove_dots: false,
        remove_extensions: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password cannot be blank!').notEmpty();
    req.checkBody('psw-repeat', 'Confirmed Password cannot be blank!').notEmpty();
    req.checkBody('psw-repeat', 'Uh-oh! Your passwords do not match!').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors.map(err => err.msg));
        res.render('register', { body: req.body, flashes: req.flash() });
        return;
    }
    next();
}

exports.addUser = async (req, res, next) => {

    const user = new User({ email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName });
    await User.register(user, req.body.password);
    next();

};