import { setTime, timerEdits, pulseTimer } from "./common";
import { playAlarm } from "./audio";

export default class Timer {

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
            title: "title",
            timerControl: ".minits__pause-play",
            resetControl: ".minits__reset",
            timerInputs: ".minits__settings-timer-input",
            playSVG: "playIcon",
            pauseSVG: "pauseIcon",
            utilActive: "active",
            utilHide: "hide",
            utilTimerRunning: "running",
            timerInTitleToggle: "timerInTitle"
        };

        this.pomodoro = document.querySelector(`${this.selectors.pomodoroBtn}`);
        this.shortBreak = document.querySelector(`${this.selectors.shortBreakBtn}`);
        this.longBreak = document.querySelector(`${this.selectors.longBreakBtn}`);
        this.navBtns = document.querySelectorAll(`${this.selectors.navBtns}`);
        this.minitsTime = document.querySelector(`${this.selectors.minitsTime}`);
        this.title = document.querySelector(`${this.selectors.title}`);
        this.timerControl = document.querySelector(`${this.selectors.timerControl}`);
        this.resetControl = document.querySelector(`${this.selectors.resetControl}`);
        this.timerInputs = document.querySelector(`${this.selectors.timerInputs}`);
        this.playSVG = document.getElementById(`${this.selectors.playSVG}`);
        this.pauseSVG = document.getElementById(`${this.selectors.pauseSVG}`);
        this.timerInTitleToggle = document.getElementById(`${this.selectors.timerInTitleToggle}`);

        if (!this.navBtns || !this.pomodoro || !this.minitsTime || !this.timerControl || !this.resetControl) return false;
        return true;
    }

    setUpEvents() {
        this.savedSettings = JSON.parse(localStorage.getItem("appState"));

        this.init();

        this.handleNav();

        this.timerControl.addEventListener("click", () => {
            this.handleTimerControl();
        });

        this.resetControl.addEventListener("click", () => {
            this.resetTime();
        });
    }

    init() {
        this.navBtns.forEach(btn => {
            btn.dataset.time = this.savedSettings[`${btn.dataset.timerType}`];
        });

        this.minitsTime.dataset.secondsStart = this.toSeconds(this.pomodoro.dataset.time);
        this.minitsTime.dataset.secondsLeft = this.toSeconds(this.pomodoro.dataset.time);
        setTime(this.minitsTime.dataset.secondsLeft, this.minitsTime);
    }

    handleNav() {
        this.navBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.setActive(btn, btn.dataset.time);

                pulseTimer();
                this.minitsTime.classList.remove(this.selectors.utilTimerRunning);
                this.minitsTime.dataset.activeTimer = btn.dataset.timerType;

                timerEdits(this.minitsTime.classList.contains(this.selectors.utilTimerRunning), this.minitsTime.dataset.activeTimer);
            });
        });
    }

    handleTimerControl() {
        this.playSVG.classList.toggle(this.selectors.utilHide);
        this.pauseSVG.classList.toggle(this.selectors.utilHide);

        this.minitsTime.classList.toggle(this.selectors.utilTimerRunning);

        this.beginCountdown(this.minitsTime.dataset.secondsLeft);

        timerEdits(this.minitsTime.classList.contains(this.selectors.utilTimerRunning), this.minitsTime.dataset.activeTimer);
    }

    resetTime() {
        const startTime = this.minitsTime.dataset.secondsStart;

        this.switchSVG();

        this.minitsTime.classList.remove(this.selectors.utilTimerRunning);
        setTime(startTime, this.minitsTime);
        this.minitsTime.dataset.secondsLeft = startTime;

        this.title.innerHTML = "Minits";

        timerEdits(this.minitsTime.classList.remove(this.selectors.utilTimerRunning), this.minitsTime.dataset.activeTimer);
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
            if (this.minitsTime.dataset.secondsLeft == 55) {
                clearInterval(countdown);
                playAlarm();
                this.resetTime();
                if (Notification.permission === "granted") {
                    this.showNotification();
                }
                this.autoStartTimers();
            }
            else if (this.minitsTime.classList.contains(this.selectors.utilTimerRunning)) {
                let secondsLeft = Math.round((endTime - Date.now()) / 1000);
                setTime(secondsLeft, this.minitsTime);
                if (this.timerInTitleToggle.checked) {
                    setTime(secondsLeft, this.title, true);
                }
                this.minitsTime.dataset.secondsLeft = secondsLeft;
            }
            else {
                this.switchSVG();
                clearInterval(countdown);
            }

        }, 1000);

    }

    showNotification() {
        let icon = "../assets/images/mLogo192.png";
        let text = "Move to the next timer.";

        new Notification("Time up!", { body: text, icon: icon });
    }

    autoStartTimers() {
        if (this.pomodoro.classList.contains(this.selectors.utilActive) &&
            JSON.parse(localStorage.getItem("appState"))["autostartBreak"] == true) {
            this.autoStartBreak();
        }
        if (this.shortBreak.classList.contains(this.selectors.utilActive) &&
            JSON.parse(localStorage.getItem("appState"))["autostartPomodoro"] == true) {
            this.autoStartPomodoro();
        }
    }

    autoStartBreak() {
        this.setActive(this.shortBreak, this.shortBreak.dataset.time);

        setTimeout(() => {
            this.playSVG.classList.add(this.selectors.utilHide);
            this.pauseSVG.classList.remove(this.selectors.utilHide);
            this.minitsTime.classList.toggle(this.selectors.utilTimerRunning);
            this.beginCountdown(this.minitsTime.dataset.secondsStart);
        }, 1000);
    }

    autoStartPomodoro() {
        this.setActive(this.pomodoro, this.pomodoro.dataset.time);

        setTimeout(() => {
            this.playSVG.classList.add(this.selectors.utilHide);
            this.pauseSVG.classList.remove(this.selectors.utilHide);
            this.minitsTime.classList.toggle(this.selectors.utilTimerRunning);
            this.beginCountdown(this.minitsTime.dataset.secondsStart);
        }, 1000);
    }

    setActive(timer, time) {
        this.addActiveClass(timer);

        this.minitsTime.dataset.secondsStart = this.toSeconds(time);
        this.minitsTime.dataset.secondsLeft = this.toSeconds(time);
        setTime(this.minitsTime.dataset.secondsLeft, this.minitsTime);
    }

    switchSVG() {
        this.playSVG.classList.remove(this.selectors.utilHide);
        this.pauseSVG.classList.add(this.selectors.utilHide);
    }

}
