let seconds = 0;
let intervalId = null;

function updateDisplay() {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedMins = String(mins).padStart(2, '0');
  const formattedSecs = String(secs).padStart(2, '0');

  if (hrs === 0) {
    // Less than 1 hour → Show MM:SS only
    document.getElementById("display").innerText = `${formattedMins}:${formattedSecs}`;
  } else {
    // 1 hour or more → Show HH:MM:SS
    const formattedHrs = String(hrs).padStart(2, '0');
    document.getElementById("display").innerText = `${formattedHrs}:${formattedMins}:${formattedSecs}`;
  }
}

function start() {
  if (intervalId !== null) return; // already running
  intervalId = setInterval(() => {
    seconds++;
    updateDisplay();
  }, 1000);
}

function stop() {
  clearInterval(intervalId);
  intervalId = null;
}

function reset() {
  clearInterval(intervalId);
  intervalId = null;
  seconds = 0;
  updateDisplay();
}