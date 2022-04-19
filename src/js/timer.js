export default class Timer {

    constructor(timerType, time) {
        this.timerType = timerType;
        this.time = time;

        if (!this.vars()) return false;
        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            minitsTime: ".minits__time",
            timerControl: ".minits__pause-play"
        }

        this.minitsTime = document.querySelector(`${this.selectors.minitsTime}`);
        this.timerControl = document.querySelector(`${this.selectors.timerControl}`);

        return true;
    }

    setUpEvents() {
        this.setTime(this.time);
        this.timerControl.addEventListener("click", () => {
            this.beginCountdown(this.time);
        })
    }

    beginCountdown(time) {
        const now = Date.now();
        const endTime = now + (time * 1000);

        const countdown = setInterval(() => {
            const secondsLeft = Math.round((endTime - Date.now()) / 1000);
            this.setTime(secondsLeft);
        }, 1000);

    }

    setTime(seconds) {
        let mins = Math.floor(seconds / 60);
        let secs = seconds % 60;

        mins = mins < 10 ? `0${mins}` : mins;
        secs = secs < 10 ? `0${secs}` : secs;

        this.displayTime(mins, secs);
    }

    displayTime(minutes, seconds) {
        this.minitsTime.innerHTML = `${minutes}:${seconds}`;
    }

}


// TO-DO

/*
* Format the time
* Check if current timer is running
*/