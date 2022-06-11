export const setTime = (seconds, timerDisplay, format = false) => {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    mins = mins < 10 ? `0${mins}` : mins;
    secs = secs < 10 ? `0${secs}` : secs;

    if (format) {
        timerDisplay.innerHTML = `| ${mins}:${secs} | Minits`
    }
    else {
        timerDisplay.innerHTML = `${mins}:${secs}`;
    }
}