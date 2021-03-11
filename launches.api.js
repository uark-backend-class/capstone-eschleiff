const axios = require('axios');
const baseUrl = 'https://api.spacexdata.com/v4/'

let launchData;
let launchNameData = {};

async function getAllLaunches() {
    const response = await axios.get(baseUrl + 'launches');
    launchData = (response.data);

    // let names = response.data[0].name;
    // console.log(names);

    // let nameData = response.data.map(element => {
    //    if (element.name) {
    //        return (element.name);
    //    } 
    // });
    // console.log(nameData);

    return launchData;

}

module.exports = {
    getAllLaunches
};

// getAllLaunches();