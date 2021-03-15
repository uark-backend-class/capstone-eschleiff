const launchesapi = require('./launches.api');

function countdownTimer() {
    let countDownDate = new Date().getTime();
    let x = setInterval( () => {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let timer = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
    });
    return (timer);
    
}