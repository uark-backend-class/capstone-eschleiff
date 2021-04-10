const upcomingLaunchDates = require('../launches.api');
const mail = require('../handlers/mail');

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

    let name = req.user.firstName
    
    res.render('home', { date, name });
};

exports.sendMail = async (req, res) => {
    await mail.sendMail({
        to: req.user.email,
        from: 'backendspacexproject@gmail.com',
        templateId: 'd-2827c58b1fe743e29047e08e5a675f1d'
    });
    req.flash('success', 'Mail sent successfully!');
    res.redirect('/');
};
