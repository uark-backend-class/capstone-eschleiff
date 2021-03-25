const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

var User = mongoose.model('User', userSchema);

module.exports = User;
