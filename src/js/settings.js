import { setTime, icons } from "./common";
import Toast from "./toast";
import { previewAlarm } from "./audio";

import bell from "../assets/audios/alarm-bell.mp3";
import bird from "../assets/audios/alarm-bird.mp3";
import digital from "../assets/audios/alarm-digital.mp3";

const allAlarmSounds = [bell, bird, digital];

let toast = new Toast();

export default class Settings {
    constructor() {
        if (!this.vars()) return false;

        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            body: "body",
            title: "title",
            settingsBtn: ".minits__settings",
            settingsPopup: ".minits__settings-popup",
            settingsNavBtns: ".minits__settings-nav-btn",
            utilTabActive: "minits__settings--tab-active",
            utilHide: "hide",
            settingsControls: ".minits__settings-controls-wrapper",
            minitsTime: ".minits__time",
            timerType: ".minits--nav-btn",
            timerInput: ".minits__settings-timer-input",
            colorInput: ".radio",
            toggles: "data-toggle",
            dropdowns: ".dropdown",
            utilMenuActiveOption: "menu__option--active",
            notiToggle: "notifications",
            alarmAudio: "alarm",
            previewAlarmAudio: "previewAlarm",
            alarmVolume: "alarmVolume",
            volumeBubble: ".volume__value"
        };

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
        this.dropdowns = document.querySelectorAll(`${this.selectors.dropdowns}`);
        this.colorPalette = document.querySelectorAll(`${this.selectors.colorInput}`);
        this.notiToggle = document.getElementById(`${this.selectors.notiToggle}`);
        this.alarmAudio = document.getElementById(`${this.selectors.alarmAudio}`);
        this.previewAlarmAudio = document.getElementById(`${this.selectors.previewAlarmAudio}`);
        this.alarmVolume = document.getElementById(`${this.selectors.alarmVolume}`);
        this.volumeBubble = document.querySelector(`${this.selectors.volumeBubble}`);

        this.activeTabClass = this.selectors.utilTabActive;
        this.menuActiveOptionClass = this.selectors.utilMenuActiveOption;
        this.hideClass = this.selectors.utilHide;

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
            "color": 4,
            "alarmSound": 1,
            "selctedAlarm": 2,
            "alarmVolAt": 50,
        };

        this.savedSettings = JSON.parse(localStorage.getItem("appState")) || localStorage.setItem("appState", JSON.stringify(this.appState));

        return true;
    }

    setUpEvents() {
        this.handleSettings();

        this.navBtns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                this.removeExistingActiveClass();
                btn.classList.add(this.activeTabClass);

                this.settingsControls.forEach(controls => {
                    controls.classList.add(this.hideClass);
                });
                this.settingsControls[index].classList.remove(this.hideClass);

            });
        });

        this.storedData = this.savedSettings || this.appState;

        window.addEventListener("load", () => {
            this.getState();
            this.handleTimerInput();
            this.handleToggles();
            this.handleColorPalette();
            this.handleDropdowns();
            this.handleRangeSliders();
        });

    }

    getState() {
        this.timerInput.forEach((input) => {
            input.value = this.storedData[`${input.dataset.timerType}`];
        });

        this.toggles.forEach(toggle => {
            toggle.checked = this.storedData[`${toggle.dataset.toggle}`];

            if (toggle.checked) this.enableSetting(toggle.dataset.toggle);
            else this.disableSetting(toggle.dataset.toggle);
        });

        this.colorPalette.forEach((palette, i) => {
            if (i == this.storedData[`${palette.dataset.radio}`]) {
                palette.checked = true;
                this.body.style.setProperty("--app-accent", `var(--c${i})`);
                this.settingsPopup.dataset.accent = `acc${i}`;
            }
        });

        this.dropdowns.forEach((dropdown) => {
            const selectedOption = dropdown.querySelector(".select__selected");
            const options = dropdown.querySelectorAll(".menu__option");
            const menuSoundName = dropdown.querySelectorAll(".menu__sound-name");

            const selectedIndex = this.storedData[dropdown.dataset.sound];

            options[selectedIndex].classList.add(this.menuActiveOptionClass);
            selectedOption.innerText = menuSoundName[selectedIndex].innerText;

            this.alarmAudio.src = allAlarmSounds[selectedIndex];
        });

        this.alarmVolume.value = this.storedData["alarmVolAt"];
        this.slideProgressTo(this.alarmVolume.value);
        this.updateVolumeBubble();
    }

    handleSettings() {
        this.settingsBtn.addEventListener("click", () => {
            this.settingsPopup.classList.add("popup--enter");
            this.settingsPopup.classList.remove("popup--exit");
            this.settingsBtn.classList.add("settings--rotate");
            document.querySelector(".overlay").style.display = "block";
        });

        const btn = document.querySelector(".minits__settings-close");
        btn.addEventListener("click", () => {
            this.settingsPopup.classList.remove("popup--enter");
            this.settingsPopup.classList.add("popup--exit");
            this.settingsBtn.classList.remove("settings--rotate");
            document.querySelector(".overlay").style.display = "none";
        });
    }

    handleTimerInput() {
        this.timerInput.forEach((input) => {
            input.addEventListener("input", () => {
                let forTimerType = document.querySelector(`button[data-timer-type="${input.dataset.timerType}"]`);

                forTimerType.dataset.time = input.value;
                this.storedData[`${forTimerType.dataset.timerType}`] = input.value;
                localStorage.setItem("appState", JSON.stringify(this.storedData));

                if (forTimerType.classList.contains("active")) {
                    this.minitsTime.dataset.secondsStart = forTimerType.dataset.time * 60;
                    this.minitsTime.dataset.secondsLeft = forTimerType.dataset.time * 60;

                    setTime(this.minitsTime.dataset.secondsLeft, this.minitsTime);
                }

            });
        });
    }

    handleToggles() {
        this.toggles.forEach(toggle => {

            toggle.addEventListener("change", () => {
                this.storedData[`${toggle.dataset.toggle}`] = toggle.checked;
                localStorage.setItem("appState", JSON.stringify(this.storedData));

                if (toggle.checked) this.enableSetting(toggle.dataset.toggle);
                else this.disableSetting(toggle.dataset.toggle);

            });

        });
    }

    handleDropdowns() {

        this.dropdowns.forEach(dropdown => {
            const selectField = dropdown.querySelector(".select");
            const caretIcon = dropdown.querySelector(".select__caret");
            const menu = dropdown.querySelector(".menu");
            const options = dropdown.querySelectorAll(".menu__option");
            const selectedOption = dropdown.querySelector(".select__selected");
            const menuSoundName = dropdown.querySelectorAll(".menu__sound-name");
            const soundPreview = dropdown.querySelectorAll(".menu__sound-preview");
            const utilMenuOpen = "menu--open";

            selectField.addEventListener("click", () => {
                caretIcon.classList.toggle("caret-rotate");

                menu.classList.toggle(utilMenuOpen);
            });

            options.forEach((option, optIndex) => {
                option.addEventListener("click", () => {
                    selectedOption.innerText = menuSoundName[optIndex].innerText;
                    selectedOption.dataset.selectedAlarm = optIndex;
                    this.alarmAudio.src = allAlarmSounds[optIndex];

                    caretIcon.classList.remove("caret-rotate");

                    menu.classList.toggle(utilMenuOpen);

                    options.forEach(op => op.classList.remove(this.menuActiveOptionClass));
                    option.classList.add(this.menuActiveOptionClass);

                    this.storedData[dropdown.dataset.sound] = optIndex;
                    localStorage.setItem("appState", JSON.stringify(this.storedData));
                });
            });

            soundPreview.forEach((btn, btnIndex) => {
                btn.addEventListener("click", (event) => {
                    event.stopPropagation();

                    this.previewAlarmAudio.src = allAlarmSounds[btnIndex];
                    previewAlarm();
                });
            });
        });
    }

    handleRangeSliders() {
        this.alarmVolume.addEventListener("input", () => {
            this.slideProgressTo(this.alarmVolume.value);

            let vol = this.alarmVolume.value / 100;
            this.previewAlarmAudio.volume = vol;
            this.alarmAudio.volume = vol;

            this.updateVolumeBubble();

            this.storedData["alarmVolAt"] = this.alarmVolume.value;
            localStorage.setItem("appState", JSON.stringify(this.storedData));
        });

    }

    enableSetting(toggledOption) {
        /* eslint-disable indent */
        switch (toggledOption) {
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
        /* eslint-enable indent */
    }

    enableNotifications() {
        console.log("noti!!");
        this.askNotificationPermission();
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
            toast.show(`${icons.info}`, "Info", "Please allow permission by clicking the info icon on the URL bar.");
            this.notiToggle.checked = false;
            this.storedData[`${this.notiToggle.dataset.toggle}`] = false;
            localStorage.setItem("appState", JSON.stringify(this.storedData));
        }

        if (Notification.permission === "default") {
            Notification.requestPermission().then(() => this.handleNotificationPermission());
        }
    }

    handleNotificationPermission() {
        if (Notification.permission === "default" || Notification.permission === "denied") {
            this.notiToggle.checked = false;
            this.storedData[`${this.notiToggle.dataset.toggle}`] = false;
            localStorage.setItem("appState", JSON.stringify(this.storedData));
        }
    }

    handleColorPalette() {
        this.colorPalette.forEach((palette, i) => {
            palette.addEventListener("click", () => {
                this.body.style.setProperty("--app-accent", `var(--c${i})`);
                this.settingsPopup.dataset.accent = `acc${i}`;

                this.storedData[`${palette.dataset.radio}`] = i;
                localStorage.setItem("appState", JSON.stringify(this.storedData));
            });
        });
    }

    updateVolumeBubble() {
        this.volumeBubble.classList.add("show");

        this.alarmVolume.addEventListener("blur", () => {
            this.volumeBubble.classList.remove("show");
        });
    }

    slideProgressTo(val) {
        const progress = document.querySelector(".volume__progress");

        progress.style.width = `${val}%`;
        this.volumeBubble.innerHTML = val;
        this.volumeBubble.style.left = `${val}%`;
    }

    removeExistingActiveClass() {
        this.navBtns.forEach(btn => btn.classList.remove(this.activeTabClass));
    }

}