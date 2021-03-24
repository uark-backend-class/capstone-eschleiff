const upcomingLaunchDates = require('../launches.api');

let latestDate = [];

exports.homePage = async (req, res) => {
    const upcomingDates = await upcomingLaunchDates.getUpcomingDates();
    let date = upcomingDates[0];
    //let todayString = today.toDateString();
    
    for (let x of upcomingDates) {
        let today = new Date();
        let newDate = new Date(x);
        if (today < newDate) {
            latestDate.push(newDate);
        }
    }


    //var date = upcomingDates[0];
    //console.log(upcomingDates);
    // console.log(todayString)
    // console.log(date);
    console.log(latestDate);

    res.render('home', { date });
};
