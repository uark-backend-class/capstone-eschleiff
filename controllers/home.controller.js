const upcomingLaunchDates = require('../launches.api');


exports.homePage = async (req, res) => {
    const upcomingDates = await upcomingLaunchDates.getUpcomingDates();
    let date = upcomingDates[0];
    let today = new Date();
    let newDate = new Date(upcomingDates[0]);

    let expired = () => {
         if (today < newDate) {
            return "Expired";         
        }
    }
    


    //var date = upcomingDates[0];
    //console.log(upcomingDates);
    console.log(today);
    console.log(date);
    console.log(newDate);

    res.render('home', { date });
};
