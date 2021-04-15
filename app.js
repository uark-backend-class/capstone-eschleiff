const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./routes/index');
const User = require('./models/users.model');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const errorHandlers = require('./handlers/errorHandlers');
const expressValidator = require('express-validator');
require('dotenv').config({ path: 'variables.env' });

// Create express app
const app = express();

// setup Google auth strategy
passport.use(new GoogleStrategy({
    clientID: "794825051885-6ta9i9sqhhqj3tdbrbp0gtc6o4aoma87.apps.googleusercontent.com",
    clientSecret: "0BJLDucxLGuStdP7yJA0gxYe",
    callbackURL: '/auth/google/redirect'
}, async (accessToken, refreshToken, profile, done) => {
    let currentUser = await User.findOne({ googleId: profile.id });

    if (currentUser) {
        done(null, currentUser);
    }
    else {
        const newUser = new User({
            email: profile.email,
            name: profile.displayName,
            googleId: profile.id
        });
    };
}));

// Static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
//passport.serializeUser(User.serializeUser());
passport.serializeUser((user, done) => {
    done(null, user._id);
});
//passport.deserializeUser(User.deserializeUser());
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id, 'firstName email _id');
    done(null, user);
});

// populate req.cookies
app.use(cookieParser());

// keeps users logged into the session
app.use(session({ 
    secret: 'doge',
    key: 'sesh',
    cookie: {
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false,
}));

// Tell app to use passport middleware
app.use(passport.initialize());1
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
