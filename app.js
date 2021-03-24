const express = require('express');
const path = require('path');
const pug = require('pug');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const User = require('./models/users.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

//Create express app
const app = express(); 

//This is the folder that has the hbs or pug  files
app.set('views', path.join(__dirname, 'views'));

//Sets pug as my viewing engine
app.set('view engine', 'pug');
//app.set('view engine', 'hbs');

// Pare url encoded data and put it into req.body
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON data and put it into req.body
app.use(express.json());

// keeps users logged into the session
app.use(session({ 
    secret: 'doge',
    resave: true,
    saveUninitialized: true
}));

// Tell app to use passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(routes);

module.exports = app;
