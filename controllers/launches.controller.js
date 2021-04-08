const launchesapi = require('../launches.api');


exports.getLaunches = async (req, res) => {
    const launchData = await launchesapi.getAllLaunches()

    res.render('launches', { launchData });
    
};

exports.getUpcomingLaunches = async (req, res) => {
    const launchData = await launchesapi.getUpcomingLaunches();

    res.render('upcoming', { launchData });
}