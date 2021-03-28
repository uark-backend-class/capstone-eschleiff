const upcomingLaunchDates = require('../../launches.api');

// const upcomingDates = launchesapi.getUpcomingLaunch();
//     var countDownDate = new Date(`${upcomingDates[0]}`).getTime();
//     var x = setInterval( () => {
//         var now = new Date().getTime();
//         var timeLeft = countDownDate - now;
//         var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//         var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//         var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
//         document.getElementById('timer').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
//     }, 1000);


// async function countdownTimer(date) {
//     var countDownDate = new Date(date).getTime();
//     var x = setInterval( () => {
//         var now = new Date().getTime();
//         var timeLeft = countDownDate - now;
//         var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//         var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//         var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
//         return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
//     }, 1000);
// }

let date;
async () => {
    await upcomingLaunchDates.getUpcomingDates();
    date = upcomingDates[0];
}
let countDownDate = new Date('2021-04-07T16:34:00.000Z');
let x = setInterval( () => {
    let now = new Date().getTime();
    let timeLeft = countDownDate - now;
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    document.getElementById('countdown').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

    console.log(now);
    console.log(countDownDate);

    if (timeLeft < 0) {
        clearInterval(x);
        document.querySelector(".timer").innerHTML = "EXPIRED";
    }
}, 1000);
