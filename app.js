const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./routes/index');
const User = require('./models/users.model');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const errorHandlers = require('./handlers/errorHandlers');
const expressValidator = require('express-validator');

// this is where I pull in the google oauth
require('./handlers/google-auth');

// this is where I pull in the github oauth
require('./handlers/github-auth');

// this is where I pull in the facebook oauth
require('./handlers/facebook-auth');

// Create express app
const app = express();

// Static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
//passport.serializeUser(User.serializeUser());
passport.serializeUser((user, done) => {
    done(null, user._id);
});
//passport.deserializeUser(User.deserializeUser());
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id, 'firstName lastName email _id');
    done(null, user);
});

// populate req.cookies
app.use(cookieParser());

// keeps users logged into the session
app.use(session({ 
    secret: 'doge',
    key: 'sesh',
    cookie: {},
    resave: false,
    saveUninitialized: false,
}));

// Tell app to use passport middleware
app.use(passport.initialize());
app.use(passport.session());

// tells app to use our flash messages
app.use(flash());

// pass variables to the templates and all requests
app.use((req, res, next) => {
    res.locals.flashes= req.flash();
    next();
});

//This is the folder that has the hbs or pug  files
app.set('views', path.join(__dirname, 'views'));

//Sets pug as my viewing engine
app.engine('hbs', exphbs({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');


// Parse url encoded data and put it into req.body
app.use(express.urlencoded({extended: true}));

// serves us static files to use in our app
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON data and put it into req.body
app.use(express.json());

// allows me to validate user registration data
app.use(expressValidator());

// tells our app what routes to use
app.use(routes);

// middleware for errors regarding the above routes
app.use(errorHandlers.notFound);

module.exports = app;
