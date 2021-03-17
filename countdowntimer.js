const launchesapi = require('./launches.api');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// const upcomingDates = launchesapi.getUpcomingLaunch();
//     let countDownDate = new Date(`${upcomingDates[0]}`).getTime();
//     let x = setInterval( () => {
//         let now = new Date().getTime();
//         let timeLeft = countDownDate - now;
//         let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//         let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//         let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
//         document.getElementById('timer').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
//     }, 1000);


async function countdownTimer() {
    const fakeDom = new JSDOM('<!DOCTYPE html><html><body><h1 id="timer"></h1></body></html>');
    const upcomingDates = await launchesapi.getUpcomingLaunch();
    let countDownDate = new Date(`${upcomingDates[0]}`).getTime();
    let x = setInterval( () => {
        let now = new Date().getTime();
        let timeLeft = countDownDate - now;
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        fakeDom.window.document.getElementById('timer').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
    }, 1000);
}

module.exports = {
    countdownTimer,
} 
