const GithubStrategy = require('passport-github2');
const passport = require('passport');
const User = require ('../models/users.model');

// setup Github auth strategy
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/redirect'
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ githubId: profile.id }, { firstName: profile.displayName.split(' ')[0], lastName: profile.displayName.split(' ')[1] }, 
        (err, user) => {
            return done(err, user);
        })
}))