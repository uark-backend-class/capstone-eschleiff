const upcomingLaunchDates = require('../launches.api');

let latestDates = [];

exports.homePage = async (req, res) => {
    const upcomingDates = await upcomingLaunchDates.getUpcomingDates();
    let today = new Date();
    
    for (let i=0; i<upcomingDates.length; i++) {
        if (new Date(upcomingDates[i]) - today > 0) {
            latestDates.push(upcomingDates[i])
        }
    }
    
    let date = latestDates[0];
    
    res.render('home', { date });
};
