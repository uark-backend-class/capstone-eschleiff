let time = document.getElementById("launchDate").innerHTML;
let countDownDate = new Date(time).getTime();
let x = setInterval(() => {
  let now = new Date().getTime();
  let timeLeft = countDownDate - now;
  let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  document.getElementById("countdown-days").innerHTML = days;
  document.getElementById("countdown-hours").innerHTML = hours;
  document.getElementById("countdown-minutes").innerHTML = minutes;
  document.getElementById("countdown-seconds").innerHTML = seconds;

  if (timeLeft < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);
