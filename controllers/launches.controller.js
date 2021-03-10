const axios = require('axios');
const launchesapi = require('../launches.api');
const bodyParser = require('body-parser');
const { json } = require('body-parser');


exports.getLaunches = async (req, res) => {
    const launchData = await launchesapi.getAllLaunches();

    const data = { launches: launchData }

    res.render('launches', { data });
    
};