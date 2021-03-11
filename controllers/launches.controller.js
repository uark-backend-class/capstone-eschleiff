const axios = require('axios');
const launchesapi = require('../launches.api');


exports.getLaunches = async (req, res) => {
    const launchData = await launchesapi.getAllLaunches()

    // let nameData = launchData.map(element => {
    //     if (element.name) {
    //         return (element.name);
    //     } 
    //  });

    res.render('launches', { title: 'title', launchData });
    
};