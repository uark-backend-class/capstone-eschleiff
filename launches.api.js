const axios = require('axios');
const baseUrl = 'https://api.spacexdata.com/v4/'

let launchData;

async function getAllLaunches() {
    const response = await axios.get(baseUrl + 'launches');
    launchData = JSON.stringify(response.data);

    return launchData;

}

module.exports = {
    getAllLaunches
};
