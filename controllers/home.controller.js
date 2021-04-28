const { patch } = require('../app');
const moment = require('moment');
const upcomingLaunchDates = require('../launches.api');
const upcomingLaunchData = require('../launches.api');
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

exports.currentLaunch = async (req, res) => {
    let launchData = await upcomingLaunchData.getNextLaunchDocs();
    let current = launchData[0];
    //console.log(current);

    let patchImage = current.links.patch.large;
    let details = current.details;
    let rocketName = current.rocket.name;
    let missionName = current.name;
    let launchpadName = current.launchpad.name;
    let launchpadRegion = current.launchpad.region;
    let localTime = moment(current.date_utc).format('ddd Do MMM, h:mm a');
    let siteTime = moment.parseZone(current.date_local).format('ddd Do MMM, h:mm a');
    let crewNames = current.crew.map(names => names.name);
    let crewImg = current.crew.map(img => img.image);

    res.render('launchinfo', { 
        title: 'Upcoming Launch Info',
        image: patchImage,
        details,
        rocketName,
        missionName,
        launchpadName,
        launchpadRegion,
        localTime,
        siteTime,
        crewNames,
        crewImg
     });
};

