const GoogleStrategy = require('passport-google-oauth20');
const passport = require('passport');
const User = require('../models/users.model');
require('dotenv').config({ path: 'variables.env' });

// setup Google auth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ googleId: profile.id }, { email: profile.emails[0].value, firstName: profile.name.givenName, lastName: profile.name.familyName}, 
        (err, user) => {
            return done(err, user);
        })
}));

