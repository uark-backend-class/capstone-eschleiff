const express = require('express');
const session = require('express-session');
const path = require('path');
const pug = require('pug');
const exphbs = require('express-handlebars');
const routes = require('./routes/index');
const User = require('./models/users.model');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

//Create express app
const app = express(); 

//This is the folder that has the hbs or pug  files
app.set('views', path.join(__dirname, 'views'));

//Sets pug as my viewing engine
//app.set('view engine', 'pug');
app.engine('hbs', exphbs({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

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
    saveUninitialized: false,
}));

// Tell app to use passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// tells app to use our flash messages
app.use(flash());

// tells our app what routes to use
app.use(routes);

module.exports = app;
