import Timer from "./timer.js";
import { setTime } from "./common.js";

export default class Nav {

    constructor() {
        if (!this.vars()) return false;

        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            navBtns: ".minits--nav-btn",
            pomodoroBtn: ".minits__pomodoro",
            shortBreakBtn: ".minits__short-break",
            longBreakBtn: ".minits__long-break",
            minitsTime: ".minits__time",
            activeClass: "active"
        }

        this.navBtns = document.querySelectorAll(`${this.selectors.navBtns}`);
        this.pomodoro = document.querySelector(`${this.selectors.pomodoroBtn}`);
        this.shortBreak = document.querySelector(`${this.selectors.shortBreakBtn}`);
        this.longBreak = document.querySelector(`${this.selectors.longBreakBtn}`);
        this.minitsTime = document.querySelector(`${this.selectors.minitsTime}`);

        if (!this.pomodoro || !this.shortBreak || !this.longBreak) return false;

        return true;
    }

    setUpEvents() {
        this.minitsTime.dataset.secondsStart = this.pomodoro.dataset.time * 60;
        this.minitsTime.dataset.secondsLeft = this.pomodoro.dataset.time * 60;
        let [minutes, seconds] = setTime(this.minitsTime.dataset.secondsLeft);
        this.displayTime(minutes, seconds);

        this.navBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.addActiveClass(btn);
                let dataTime = btn.dataset.time;

                this.minitsTime.classList.remove("running")
                this.minitsTime.dataset.secondsStart = this.toSeconds(dataTime);
                this.minitsTime.dataset.secondsLeft = this.toSeconds(dataTime);
                let [minutes, seconds] = setTime(this.toSeconds(dataTime));
                this.displayTime(minutes, seconds);

            })
        });

    }

    addActiveClass(element) {
        this.removeExistingActiveClass();
        element.classList.add(`${this.selectors.activeClass}`);
    }

    removeExistingActiveClass() {
        this.navBtns.forEach((btn) => {
            btn.classList.remove("active");
        });
    }

    toSeconds(t) {
        return t * 60;
    }

    displayTime(minutes, seconds) {
        this.minitsTime.innerHTML = `${minutes}:${seconds}`;
    }
}