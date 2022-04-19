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

        return true;
    }

    setUpEvents() {

        this.navBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.addActiveClass(btn);
                let dataTime = btn.dataset.time;
                new Timer("pomodor", this.toSeconds(dataTime));
                console.log(new Timer("pomodoro", this.toSeconds(dataTime)));
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
}