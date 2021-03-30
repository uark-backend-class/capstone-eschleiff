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

// Static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
//passport.serializeUser(User.serializeUser());
passport.serializeUser((user, done) => {
    done(null, user._id);
});
//passport.deserializeUser(User.deserializeUser());
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id, 'name email _id');
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
app.use(passport.initialize());
app.use(passport.session());

// tells app to use our flash messages
app.use(flash());

// pass variables to the templates and all requests
app.use((req, res, next) => {
    res.locals.flashes= req.flash();
    res.locals.user = req.user || null;
    next();
});

//This is the folder that has the hbs or pug  files
app.set('views', path.join(__dirname, 'views'));

//Sets pug as my viewing engine
//app.set('view engine', 'pug');
app.engine('hbs', exphbs({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');


// Pare url encoded data and put it into req.body
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON data and put it into req.body
app.use(express.json());

// tells our app what routes to use
app.use(routes);

module.exports = app;
