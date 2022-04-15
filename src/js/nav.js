export default class Nav {

    constructor() {
        if (!this.vars()) return false;

        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            pomodoroBtn: "#pomodoro",
            shortBreakBtn: ".minits__short-break",
            longBreakBtn: ".minits__long-break"
        }

        this.pomodoro = document.querySelector(`${this.selectors.pomodoroBtn}`);
        this.shortBreak = document.querySelector(`${this.selectors.shortBreakBtn}`);
        this.longBreak = document.querySelector(`${this.selectors.longBreakBtn}`);

        if (!this.pomodoro || !this.shortBreak || !this.longBreak) return false;

        return true;
    }

    setUpEvents() {

        this.pomodoro.addEventListener("click", () => {
            this.pomodoro.classList.add("active");
        })
    }
}