import { setTime } from "./common";

export default class Settings {
    constructor() {
        if (!this.vars()) return false;

        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            body: "body",
            title: "title",
            settingsSVG: "settings-icon",
            closeSVG: "close-icon",
            settingsBtn: ".minits__settings",
            settingsPopup: ".minits__settings-popup",
            settingsNavBtns: ".minits__settings-nav-btn",
            settingsControls: ".minits__settings-controls-wrapper",
            minitsTime: ".minits__time",
            timerType: ".minits--nav-btn",
            timerInput: ".minits__settings-timer-input",
            colorInput: ".radio",
            toggles: "data-toggle",
            notiToggle: "notifications"
        }

        this.body = document.querySelector(`${this.selectors.body}`);
        this.title = document.querySelector(`${this.selectors.title}`);
        this.settingsBtn = document.querySelector(`${this.selectors.settingsBtn}`);
        this.settingsPopup = document.querySelector(`${this.selectors.settingsPopup}`);
        this.navBtns = document.querySelectorAll(`${this.selectors.settingsNavBtns}`);
        this.settingsControls = document.querySelectorAll(`${this.selectors.settingsControls}`);
        this.minitsTime = document.querySelector(`${this.selectors.minitsTime}`);
        this.timerType = document.querySelectorAll(`${this.selectors.timerType}`);
        this.timerInput = document.querySelectorAll(`${this.selectors.timerInput}`);
        this.toggles = document.querySelectorAll(`[${this.selectors.toggles}]`);
        this.colorPalette = document.querySelectorAll(`${this.selectors.colorInput}`);
        this.notiToggle = document.getElementById(`${this.selectors.notiToggle}`);

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
            "color": 4
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

        this.storedData = this.savedSettings || this.appState;

        this.getState();
        this.handleTimerInput();
        this.handleToggles();
        this.handleColorPalette();
    }

    getState() {
        this.timerInput.forEach((input, i) => {
            input.value = this.storedData[`${input.dataset.timerType}`];
        })

        this.toggles.forEach(toggle => {
            toggle.checked = this.storedData[`${toggle.dataset.toggle}`];

            if (toggle.checked) this.enableSetting(toggle.dataset.toggle);
            else this.disableSetting(toggle.dataset.toggle);
        })

        this.colorPalette.forEach((palette, i) => {
            if (i == this.storedData[`${palette.dataset.radio}`]) {
                palette.checked = true;
                this.body.style.setProperty("--app-accent", `var(--c${i})`)
            }
        })
    }

    handleTimerInput() {
        this.timerInput.forEach((input, i) => {
            input.addEventListener("input", () => {
                // let type = this.timerType[i];
                let forTimerType = document.querySelector(`button[data-timer-type="${input.dataset.timerType}"]`);

                forTimerType.dataset.time = input.value;
                this.storedData[`${forTimerType.dataset.timerType}`] = input.value;
                localStorage.setItem("appState", JSON.stringify(this.storedData));

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
                this.storedData[`${toggle.dataset.toggle}`] = toggle.checked;
                localStorage.setItem("appState", JSON.stringify(this.storedData));

                if (toggle.checked) this.enableSetting(toggle.dataset.toggle);
                else this.disableSetting(toggle.dataset.toggle);

            })

        })
    }

    enableSetting(toggledOption) {

        switch (toggledOption) {
            case "darkMode":
                this.enableDarkMode();
                break;
            case "timerInTitle":
                this.enableTimerInTitle();
                break;
            case "nowPlaying":
                // this.enableNowPlaying();
                break;

            default:
                return;
        }
    }

    disableSetting(toggledOption) {
        switch (toggledOption) {
            case "darkMode":
                this.disableDarkMode();
                break;
            case "timerInTitle":
                this.disableTimerInTitle();
                break;
            default:
                return;
        }
    }

    enableDarkMode() {
        this.body.dataset.theme = "dark";
    }

    disableDarkMode() {
        this.body.dataset.theme = "light";
    }

    enableTimerInTitle() {
        console.log("timeytime");
    }

    disableTimerInTitle() {
        this.title.innerHTML = "Minits";
    }

    askNotificationPermission() {
        if (Notification.permission === "denied") {
            this.notiToggle.checked = false;
            this.storedData[`${this.notiToggle.dataset.toggle}`] = false;
            localStorage.setItem("appState", JSON.stringify(this.storedData));
            console.log(this.storedData);
        }

        if (Notification.permission === "default") {
            Notification.requestPermission().then((result) => this.handleNotificationPermission());
        }
    }

    handleNotificationPermission() {
        if (Notification.permission === "default" || Notification.permission === "denied") {
            this.notiToggle.checked = false;
            this.storedData[`${this.notiToggle.dataset.toggle}`] = false;
            localStorage.setItem("appState", JSON.stringify(this.storedData));
            console.log(this.storedData);
        }
    }

    handleColorPalette() {
        this.colorPalette.forEach((palette, i) => {
            palette.addEventListener("click", () => {
                this.body.style.setProperty("--app-accent", `var(--c${i})`);

                this.storedData[`${palette.dataset.radio}`] = i;
                localStorage.setItem("appState", JSON.stringify(this.storedData));
            })
        })
    }

    removeExistingActiveClass() {
        this.navBtns.forEach(btn => btn.classList.remove("tex"));
    }

}