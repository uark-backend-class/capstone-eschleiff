const axios = require('axios');
const baseUrl = 'https://api.spacexdata.com/v4/'

let launchData;
let launchNameData = [];

async function getAllLaunches() {
    const response = await axios.get(baseUrl + 'launches');
    launchData = JSON.stringify(response.data);

   for (names in response) {
       console.log(names);
   }

    return launchData;

}

module.exports = {
    getAllLaunches
};

getAllLaunches();