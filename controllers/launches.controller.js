const axios = require('axios');
const launchesapi = require('../launches.api');


exports.getLaunches = async (req, res) => {
    const launchData = await launchesapi.getAllLaunches()

    res.render('launches', { launchData });
    
};