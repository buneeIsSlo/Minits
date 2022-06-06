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

        this.appState = {
            "pomodoro": 25,
            "shortBreak": 5,
            "longBreak": 15,
            "autostartPomodoro": false,
            "autostartBreak": true,
            "notifications": false,
            "darkMode": false,
            "timerInTitle": true,
            "nowPlaying": true,
        }

        this.savedSettings = JSON.parse(localStorage.getItem("appState")) || localStorage.setItem("appState", JSON.stringify(this.appState));

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
        let storedData = this.savedSettings || this.appState;
        console.log(this.savedSettings);

        this.timerInput.forEach((input, i) => {
            input.value = storedData[`${input.dataset.timerType}`];
        })

        this.toggles.forEach(toggle => {
            toggle.checked = storedData[`${toggle.dataset.toggle}`];
            if (toggle.checked) this.toggledSetting(toggle.dataset.toggle);
        })

    }

    handleTimerInput() {
        this.timerInput.forEach((input, i) => {
            input.addEventListener("input", () => {
                // let type = this.timerType[i];
                let forTimerType = document.querySelector(`button[data-timer-type="${input.dataset.timerType}"]`);

                forTimerType.dataset.time = input.value;
                this.savedSettings[`${forTimerType.dataset.timerType}`] = input.value;

                localStorage.setItem("appState", JSON.stringify(this.savedSettings));

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
                if (toggle.checked) this.toggledSetting(toggle.dataset.toggle);
                this.savedSettings[`${toggle.dataset.toggle}`] = toggle.checked;

                localStorage.setItem("appState", JSON.stringify(this.savedSettings));
            })

        })
    }

    toggledSetting(toggledOption) {

        switch (toggledOption) {
            case "autostartPomodoro":
                this.enableAutostartPomodoro();
                break;
            case "autostartBreak":
                this.enableAutostartBreak();
                break;
            case "notifications":
                this.enableNotifications();
                break;
            case "darkMode":
                this.enableDarkMode();
                break;
            case "timerInTitle":
                this.enableTimerInTitle();
                break;
            case "nowPlaying":
                this.enableNowPlaying();
                break;
            default:
                console.log("Invalid option");
        }
    }

    enableAutostartPomodoro() {
        console.log("pompmo");
    }

    enableAutostartBreak() {
        console.log("breakybreak");

        if (+(this.minitsTime.dataset.secondsLeft) < 57)
            this.timerType[1].click();
    }

    enableNotifications() {
        console.log("noti!!");
    }

    enableDarkMode() {
        console.log("darkydark");
    }

    enableTimerInTitle() {
        console.log("timeytime");
    }

    enableNowPlaying() {
        console.log("playiplay");
    }


    removeExistingActiveClass() {
        this.navBtns.forEach(btn => btn.classList.remove("tex"));
    }

}