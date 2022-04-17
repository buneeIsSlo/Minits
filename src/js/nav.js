import Timer from "./timer.js";

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
            activeClass: "active"
        }

        this.navBtns = document.querySelectorAll(`${this.selectors.navBtns}`);
        this.pomodoro = document.querySelector(`${this.selectors.pomodoroBtn}`);
        this.shortBreak = document.querySelector(`${this.selectors.shortBreakBtn}`);
        this.longBreak = document.querySelector(`${this.selectors.longBreakBtn}`);

        if (!this.pomodoro || !this.shortBreak || !this.longBreak) return false;

        // this.pomodoroTime = "25:00";
        // this.shortBreakTime = "10:00";
        // this.longBreakTime = "45:00";
        // this.timerType;
        // this.time;

        return true;
    }

    setUpEvents() {

        this.navBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.addActiveClass(btn);
                console.log(btn.dataset.timerType);
                console.log(btn.dataset.time);
                new Timer("pomodor", btn.dataset.time);
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
}