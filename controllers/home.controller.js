const timer = require('../countdowntimer');
const upcomingLaunchDates = require('../launches.api');

exports.homePage = async (req, res) => {
    const upcomingDates = await upcomingLaunchDates.getUpcomingDates();

    var date = upcomingDates[0];
    console.log(date);

    res.render('home', { date });
};
