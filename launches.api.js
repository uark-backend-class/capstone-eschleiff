const axios = require('axios');
const baseUrl = 'https://api.spacexdata.com/v4/'

let launchData;
let upcomingLaunchData = [];

async function getAllLaunches() {
    const response = await axios.get(baseUrl + 'launches');
    launchData = (response.data);

    return launchData.reverse();

}

async function getUpcomingLaunches() {
    const response = await axios.get(baseUrl + 'launches/upcoming');
    launchData = response.data;

    return launchData;
}

async function getUpcomingDates() {
    const response = await axios.get(baseUrl + 'launches/upcoming');
    upcomingLaunchData = (response.data);

    let upcomingDates = upcomingLaunchData.map(elem => elem.date_utc);
    
    return (upcomingDates);
}

async function getLatestDate() {
    let today = new Date();
    let dates = [];

    const response = await axios.get(baseUrl + 'launches/upcoming');
    let latestDateData = response.data;

    let latestDates = latestDateData.map(elem => elem.data_utc);

    for (let i=0; i<latestDates.length; i++) {
        if (new Date(latestDates[i]) - today > 0) {
            dates.push(latestDates[i])
        }
    }

    return dates[0];

}

module.exports = {
    getAllLaunches,
    getUpcomingLaunches,
    getUpcomingDates,
    getLatestDate,
};
