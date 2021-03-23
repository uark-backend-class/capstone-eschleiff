const passport = require('passport');
const User = require('../models/users.model');

exports.register = (req, res) => {
    
   

    res.render('register')

};

exports.addUser = async (req, res) => {

    User.register(new User({ username: req.body.username }), req.body.password, req.body.firstName, req.body.lastName, (err, user) => {
        if (err) {
            return res.render('register', { info: 'Sorry. That username already exists. Try again.', user: user });
        }

        passport.authenticate('local')(req, res, () => {
            res.redirect('/');
        });
    });

    // if (req.body.firstName && req.body.lastName) {
    //     let user = await User.findOne({ firstName: req.body.firstName, lastName: req.body.lastName });
    //     if (user) {
    //         console.log('This user already exists');
    //         res.redirect('/register');
    //     }
    // }
    // else {
    //     const user = new User(req.body);
    //     await user.save(); 
    //     res.redirect('/');
    // }


};