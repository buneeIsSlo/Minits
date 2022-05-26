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
            inputPomdoro: "inputPomodoro"
        }

        this.settingsBtn = document.querySelector(`${this.selectors.settingsBtn}`);
        this.settingsPopup = document.querySelector(`${this.selectors.settingsPopup}`);
        this.navBtns = document.querySelectorAll(`${this.selectors.settingsNavBtns}`);
        this.settingsControls = document.querySelectorAll(`${this.selectors.settingsControls}`);
        this.inputPomodoro = document.getElementById(`${this.selectors.inputPomdoro}`);

        this.settingsSVG = document.getElementById(`${this.selectors.settingsSVG}`);
        this.closeSVG = document.getElementById(`${this.selectors.closeSVG}`);

        this.appState = {
            pomodoroTime: this.inputPomodoro.value
        }

        return true;
    }

    setUpEvents() {

        console.log(JSON.parse(localStorage.getItem("appState")));

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


        this.inputPomodoro.value = JSON.parse(localStorage.getItem("appState")).pomodoroTime;
        this.handleTimerInput();
    }

    handleTimerInput() {
        this.inputPomodoro.addEventListener("input", () => {
            this.appState.pomodoroTime = this.inputPomodoro.value;
            localStorage.setItem("appState", JSON.stringify(this.appState));
        })
    }

    removeExistingActiveClass() {
        this.navBtns.forEach(btn => btn.classList.remove("tex"));
    }

}