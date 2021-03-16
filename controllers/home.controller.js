const timer = require('../countdowntimer');

exports.homePage = async (req, res) => {
    const countdownTimer = await timer.countdownTimer();

    res.render('home', { countdownTimer });
};
