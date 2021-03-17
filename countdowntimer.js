const launchesapi = require('./launches.api');

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


async function countdownTimer(date) {
    var countDownDate = new Date(date).getTime();
    var x = setInterval( () => {
        var now = new Date().getTime();
        var timeLeft = countDownDate - now;
        var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
    }, 1000);
}   

module.exports = {
    countdownTimer,
} 
