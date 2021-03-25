const mongoose = require('mongoose');
const User = require('../models/users.model');

exports.registerPage = (req, res) => {
    
    res.render('register')

};

exports.addUser = async (req, res, next) => {

    const user = new User({ email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName });
    await User.register(user, req.body.password);
    next();
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