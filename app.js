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

// scheduler to send emails out to db when the launch reaches 1 hour left
// const job = schedule.scheduleJob('0 * * * *', async() => {
//     let today = new Date();
    
//     if (latestDate.getLatestDate() - today == 1) {
//         let emails = await mail.userEmails();
//         for (email of emails) {
//             await mail.sendMail({
//                 to: email,
//                 from: 'backendspacexproject@gmail.com',
//                 templateId: 'd-2827c58b1fe743e29047e08e5a675f1d'
//             });
//         }
//     }
//     else {
//         console.log("Time is greater than 1 hour." + today.toUTCString());
//     }

//     console.log('This task should be running every hour...hopefully.');
// });

module.exports = app;
