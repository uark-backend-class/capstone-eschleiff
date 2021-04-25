const axios = require('axios');
const baseUrl = 'https://api.spacexdata.com/v4/'

let launchData;
let upcomingLaunchData = [];

// grabs array with all the launches
async function getAllLaunches() {
    const response = await axios.get(baseUrl + 'launches');
    launchData = (response.data);

    return launchData.reverse();

}

// grabs array with upcoming launches
async function getUpcomingLaunches() {
    const response = await axios.get(baseUrl + 'launches/upcoming');
    launchData = response.data;

    return launchData;
}

// grabs array with query of upcoming launches
async function getNextLaunchDocs() {
    const response = await axios.post(baseUrl + 'launches/query', {
        query: {
            success: null,
        },
        options: {
            sort: {
                flight_number: 'asc',
            },
            limit: 10,
            populate: [
                'cores.core',
                'cores.landpad',
                'ships',
                'crew',
                'capsules',
                'payloads',
                'launchpad',
                {
                    path: 'rocket',
                    select: {
                        name: 1,
                    }
                }
            ]
        }
    });
    launchData = response.data.docs;

    return launchData;
}

// grabs array with all the dates of the upcoming launches
async function getUpcomingDates() {
    const response = await axios.get(baseUrl + 'launches/upcoming');
    upcomingLaunchData = (response.data);

    let upcomingDates = upcomingLaunchData.map(elem => elem.date_utc);
    
    return upcomingDates;
}

// grabs array with the dates of the upcoming launches
async function getLatestDate() {
    let today = Math.floor(new Date().getTime() / 1000);
    let dates = [];
    
    let response = await axios.get(baseUrl + 'launches/upcoming');
    let latestDateData = response.data;

    let latestDates = latestDateData.map(elem => elem.date_unix);

    // creates new array with dates that havent expired
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
    getNextLaunchDocs
};
