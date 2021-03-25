const express = require('express');
const session = require('express-session');
const path = require('path');
const pug = require('pug');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const User = mongoose.model('User');
const passport = require('passport');
const cookieParser = require('cookie-parser');

//Create express app
const app = express(); 

//This is the folder that has the hbs or pug  files
app.set('views', path.join(__dirname, 'views'));

//Sets pug as my viewing engine
app.set('view engine', 'pug');
//app.set('view engine', 'hbs');

// populate req.cookies
app.use(cookieParser());

// Pare url encoded data and put it into req.body
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON data and put it into req.body
app.use(express.json());

// keeps users logged into the session
app.use(session({ 
    secret: 'doge',
    resave: false,
    saveUninitialized: false
}));

// Tell app to use passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(routes);

module.exports = app;
