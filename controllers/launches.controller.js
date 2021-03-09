const axios = require('axios');
const bodyParser = require('body-parser');
const { json } = require('body-parser');

exports.homePage = (req, res) => {
    res.render('home');
};

exports.getLaunches = async (req, res) => {
    let launches = await axios.get('https://api.spacexdata.com/v4/launches/upcoming', { headers: { 'Accept': 'application/json'} })
    let launchDetails = launches.data

    res.render('launches', {launchDetails});
    
};