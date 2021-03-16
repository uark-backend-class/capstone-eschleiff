const axios = require('axios');
const baseUrl = 'https://api.spacexdata.com/v4/'

let launchData;
let upcomingLaunchData = [];

async function getAllLaunches() {
    const response = await axios.get(baseUrl + 'launches');
    launchData = (response.data);

    return launchData.reverse();

}

async function getUpcomingLaunch() {
    const response = await axios.get(baseUrl + 'launches/upcoming');
    upcomingLaunchData = (response.data);

    let upcomingDates = upcomingLaunchData.map(elem => elem.date_utc);
    
    return upcomingDates;
}

module.exports = {
    getAllLaunches,
    getUpcomingLaunch,
};