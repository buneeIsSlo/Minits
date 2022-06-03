import { setTime } from "./common";

export default class Settings {
    constructor() {
        if (!this.vars()) return false;

        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            settingsSVG: "settings-icon",
            closeSVG: "close-icon",
            settingsBtn: ".minits__settings",
            settingsPopup: ".minits__settings-popup",
            settingsNavBtns: ".minits__settings-nav-btn",
            settingsControls: ".minits__settings-controls-wrapper",
            minitsTime: ".minits__time",
            timerType: ".minits--nav-btn",
            timerInput: ".minits__settings-timer-input",
            toggles: "data-toggle"
        }

        this.settingsBtn = document.querySelector(`${this.selectors.settingsBtn}`);
        this.settingsPopup = document.querySelector(`${this.selectors.settingsPopup}`);
        this.navBtns = document.querySelectorAll(`${this.selectors.settingsNavBtns}`);
        this.settingsControls = document.querySelectorAll(`${this.selectors.settingsControls}`);
        this.minitsTime = document.querySelector(`${this.selectors.minitsTime}`);
        this.timerType = document.querySelectorAll(`${this.selectors.timerType}`);
        this.timerInput = document.querySelectorAll(`${this.selectors.timerInput}`);
        this.toggles = document.querySelectorAll(`[${this.selectors.toggles}]`);

        this.settingsSVG = document.getElementById(`${this.selectors.settingsSVG}`);
        this.closeSVG = document.getElementById(`${this.selectors.closeSVG}`);

        this.default = -1;

        this.appState = {
            "pomodoro": 25,
            "shortBreak": 5,
            "longBreak": 15,

        }

        return true;
    }

    setUpEvents() {


        this.settingsBtn.addEventListener("click", () => {
            this.settingsSVG.classList.toggle("hide");
            this.closeSVG.classList.toggle("hide");
            this.settingsPopup.classList.toggle("hide");
        })

        this.navBtns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                this.removeExistingActiveClass();
                btn.classList.add("tex");

                this.settingsControls.forEach(controls => {
                    controls.classList.add("hide");
                })
                this.settingsControls[index].classList.remove("hide");

            })
        })

        this.getState();
        this.handleTimerInput();
        this.handleToggles();
    }

    getState() {
        let storedData = JSON.parse(localStorage.getItem("appState")) || this.appState;

        this.timerInput.forEach((input, i) => {
            input.value = storedData[input.dataset.timerType];
        })

        this.toggles.forEach(toggle => {
            toggle.checked = storedData[`${toggle.dataset.toggle}`];
        })

        console.log(this.toggles);
    }

    handleTimerInput() {
        this.timerInput.forEach((input, i) => {
            input.addEventListener("input", () => {
                // let type = this.timerType[i];
                let forTimerType = document.querySelector(`button[data-timer-type="${input.dataset.timerType}"]`);

                forTimerType.dataset.time = input.value;
                this.appState[forTimerType.dataset.timerType] = input.value;

                localStorage.setItem("appState", JSON.stringify(this.appState));

                if (forTimerType.classList.contains("active")) {
                    this.minitsTime.dataset.secondsStart = forTimerType.dataset.time * 60;
                    this.minitsTime.dataset.secondsLeft = forTimerType.dataset.time * 60;

                    setTime(this.minitsTime.dataset.secondsLeft, this.minitsTime);
                }

            })
        })
    }

    handleToggles() {
        this.toggles.forEach(toggle => {
            toggle.addEventListener("change", () => {
                let res = toggle.checked ? true : false;

                this.appState[toggle.dataset.toggle] = res;
                console.log(toggle.checked);

                localStorage.setItem("appState", JSON.stringify(this.appState));
            })
        })
    }

    removeExistingActiveClass() {
        this.navBtns.forEach(btn => btn.classList.remove("tex"));
    }

}