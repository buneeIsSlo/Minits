export const setTime = (seconds, timerDisplay) => {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    mins = mins < 10 ? `0${mins}` : mins;
    secs = secs < 10 ? `0${secs}` : secs;

    timerDisplay.innerHTML = `${mins}:${secs}`;
}