export default class Timer {

    constructor() {
        if (!this.vars()) return false;

        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            navBtns: ".minits--nav-btn",
            pomodoroBtn: ".minits__pomodoro",
            minitsTime: ".minits__time",
            timerControl: ".minits__pause-play",
            resetControl: ".minits__reset",
            playSVG: "play-icon",
            pauseSVG: "pause-icon",
            utilActive: "active",
            utilHide: "hide",
            utilTimerRunning: "running",
        }

        this.navBtns = document.querySelectorAll(`${this.selectors.navBtns}`);
        this.pomodoro = document.querySelector(`${this.selectors.pomodoroBtn}`);
        this.minitsTime = document.querySelector(`${this.selectors.minitsTime}`);
        this.timerControl = document.querySelector(`${this.selectors.timerControl}`);
        this.resetControl = document.querySelector(`${this.selectors.resetControl}`);
        this.playSVG = document.getElementById(`${this.selectors.playSVG}`);
        this.pauseSVG = document.getElementById(`${this.selectors.pauseSVG}`);

        if (!this.navBtns || !this.pomodoro || !this.minitsTime || !this.timerControl || !this.resetControl) return false;
        return true;
    }

    setUpEvents() {
        this.init();

        this.handleNav();

        this.timerControl.addEventListener("click", () => {
            this.handleTimerControl();
        });

        this.resetControl.addEventListener("click", () => {
            this.handleResetControl();
        })
    }

    init() {
        this.minitsTime.dataset.secondsStart = this.toSeconds(this.pomodoro.dataset.time);
        this.minitsTime.dataset.secondsLeft = this.toSeconds(this.pomodoro.dataset.time);
        this.setTime(this.minitsTime.dataset.secondsLeft);
    }

    handleNav() {
        this.navBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.addActiveClass(btn);
                this.minitsTime.classList.remove(this.selectors.utilTimerRunning);

                let dataTime = this.toSeconds(btn.dataset.time);

                this.minitsTime.dataset.secondsStart = dataTime;
                this.minitsTime.dataset.secondsLeft = dataTime;
                this.setTime(dataTime);
            })
        });
    }

    handleTimerControl() {
        this.playSVG.classList.toggle(this.selectors.utilHide);
        this.pauseSVG.classList.toggle(this.selectors.utilHide);

        this.minitsTime.classList.toggle(this.selectors.utilTimerRunning);

        this.beginCountdown(this.minitsTime.dataset.secondsLeft);
    }

    handleResetControl() {
        const startTime = this.minitsTime.dataset.secondsStart;

        this.switchSVG();

        this.minitsTime.classList.remove(this.selectors.utilTimerRunning);

        this.setTime(startTime);
        this.minitsTime.dataset.secondsLeft = startTime;
    }

    addActiveClass(element) {
        this.removeExistingActiveClass();
        element.classList.add(`${this.selectors.utilActive}`);
    }

    removeExistingActiveClass() {
        this.navBtns.forEach((btn) => {
            btn.classList.remove("active");
        });
    }

    toSeconds(t) {
        return t * 60;
    }

    beginCountdown(time) {
        const now = Date.now();
        const endTime = now + (time * 1000);

        const countdown = setInterval(() => {
            if (this.minitsTime.classList.contains(this.selectors.utilTimerRunning)) {
                let secondsLeft = Math.round((endTime - Date.now()) / 1000);
                this.setTime(secondsLeft);
                this.minitsTime.dataset.secondsLeft = secondsLeft;
            }
            else {
                this.switchSVG();
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

    switchSVG() {
        this.playSVG.classList.remove(this.selectors.utilHide);
        this.pauseSVG.classList.add(this.selectors.utilHide);
    }

}
