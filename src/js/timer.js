export default class Timer {

    constructor() {
        if (!this.vars()) return false;

        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            minitsTime: ".minits__time",
            timerControl: ".minits__pause-play",
            resetControl: ".minits__reset",
            playSVG: "play-icon",
            pauseSVG: "pause-icon"
        }

        this.minitsTime = document.querySelector(`${this.selectors.minitsTime}`);
        this.timerControl = document.querySelector(`${this.selectors.timerControl}`);
        this.resetControl = document.querySelector(`${this.selectors.resetControl}`);
        this.playSVG = document.getElementById(`${this.selectors.playSVG}`);
        this.pauseSVG = document.getElementById(`${this.selectors.pauseSVG}`);

        this.startTime = this.minitsTime.dataset.secondsLeft;

        return true;
    }

    setUpEvents() {
        this.timerControl.addEventListener("click", () => {
            this.toggle();

            this.minitsTime.classList.toggle("running");

            this.beginCountdown(+this.minitsTime.dataset.secondsLeft);
        });

        this.resetControl.addEventListener("click", () => {
            const startTime = this.minitsTime.dataset.secondsStart;

            this.playSVG.classList.remove("hide");
            this.pauseSVG.classList.add("hide");

            this.minitsTime.classList.remove("running");

            this.setTime(startTime);
            this.minitsTime.dataset.secondsLeft = startTime;
        })
    }

    beginCountdown(time) {
        const now = Date.now();
        const endTime = now + (time * 1000);
        let secondsLeft;

        const countdown = setInterval(() => {
            if (this.minitsTime.classList.contains("running")) {
                secondsLeft = Math.round((endTime - Date.now()) / 1000);
                this.setTime(secondsLeft);
                this.minitsTime.dataset.secondsLeft = secondsLeft;
            }
            else {
                this.playSVG.classList.remove("hide");
                this.pauseSVG.classList.add("hide");
                clearInterval(countdown);
            }
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

    toggle() {
        this.playSVG.classList.toggle("hide");
        this.pauseSVG.classList.toggle("hide");
    }
}
