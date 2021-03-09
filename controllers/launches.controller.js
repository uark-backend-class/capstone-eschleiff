const axios = require('axios');
const launchesapi = require('../launches.api');
const bodyParser = require('body-parser');
const { json } = require('body-parser');

exports.homePage = (req, res) => {
    res.render('home');
};

exports.getLaunches = async (req, res) => {
    const launchData = await launchesapi.getLaunches();

    const data = { launches: launchData }

    res.render('launches', { data });
    
};