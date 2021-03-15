const axios = require('axios');
const baseUrl = 'https://api.spacexdata.com/v4/'

let launchData;
let launchNameData;
let launchDates = [];

async function getAllLaunches() {
    const response = await axios.get(baseUrl + 'launches');
    launchData = (response.data);

    return launchData.reverse();

}

async function getLaunchDates() {
    const response = await axios.get(baseUrl + 'launches/latest');
    launchData = response.data;

    for (let property of launchData) {
        launchDates.push(property.date_utc)
    }
    console.log(launchDates);
}

module.exports = {
    getAllLaunches,
    getLaunchDates,
};

getLaunchDates();