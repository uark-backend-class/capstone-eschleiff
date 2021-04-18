const FacebookStrategy = require('passport-facebook');
const passport = require('passport');
const User = require('../models/users.model');
require('dotenv').config({ path: 'variables.env' });

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/redirect'
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ facebookId: profile.id }, { firstName: profile.displayName.split(' ')[0], lastName: profile.displayName.split(' ')[1] },  
        (err, user) => {
            console.log(profile);
            console.log(user);
            return done(err, user);
        })
}))