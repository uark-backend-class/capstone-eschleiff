const upcomingLaunchDates = require('../launches.api');
const User = require('../models/users.model');

let latestDates = [];

exports.homePage = async (req, res) => {
    const upcomingDates = await upcomingLaunchDates.getUpcomingDates();
    let today = new Date();
    
    // removes any dates from the above array that have expired and pushes the rest into a new array
    for (let i=0; i<upcomingDates.length; i++) {
        if (new Date(upcomingDates[i]) - today > 0) {
            latestDates.push(upcomingDates[i])
        }
    }
    let date = latestDates[0];

    let name = req.user.firstName;
    res.render('home', { date, name });
};

exports.profile = (req, res) => {
    let firstName = req.user.firstName;
    let lastName = req.user.lastName;
    let email = req.user.email;
    res.render('profile', { title: 'Update Your Profile', firstName, lastName, email });
}

exports.updateProfile = async (req, res) => {
    const updates = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: updates },
        { new: true, runValidators: true, context: 'query' }
    );

    req.flash('success', 'Successfully updated profile!');
    res.redirect('/');
};

