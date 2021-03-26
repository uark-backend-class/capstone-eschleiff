const mongoose = require('mongoose');
const User = require('../models/users.model');

exports.registerPage = (req, res) => {
    
    res.render('register')

};

exports.addUser = async (req, res, next) => {

    const user = new User({ email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName });
    await User.register(user, req.body.password);
    next();

};