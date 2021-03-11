const axios = require('axios');
const baseUrl = 'https://api.spacexdata.com/v4/'

let launchData;
let launchNameData = {};

async function getAllLaunches() {
    const response = await axios.get(baseUrl + 'launches');
    launchData = (response.data);

    return launchData.reverse();

}

module.exports = {
    getAllLaunches
};

// getAllLaunches();