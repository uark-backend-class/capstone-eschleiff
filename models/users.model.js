const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    googleId: {type: String, unique: true},
    githubId: {type: String, unique: true},
    facebookId: {type: String, unique: true}
    },
    { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(findOrCreate);

const User = mongoose.model('user', userSchema);

module.exports = User;
