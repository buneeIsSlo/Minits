import { setTime, icons, playCodeRadio, insertNowPlaying, removeNowPlaying } from "./utils";
import Toast from "./toast";
import { previewAlarm } from "./audio";

import analog from "../assets/audios/analog.mp3";
import buzzer from "../assets/audios/buzzer.mp3";
import digital from "../assets/audios/digital.mp3";
import squirble from "../assets/audios/squirble.mp3";
import ticking from "../assets/audios/ticking.wav";
import deepSpace from "../assets/audios/deepSpace.mp3";

const allAlarmSounds = [analog, buzzer, digital, squirble];
const allAmbientTracks = [ticking, "codeRadio", deepSpace];

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
            timerInputInfoBtn: ".stop-timer-info",
            colorInput: ".radio",
            toggles: "data-toggle",
            dropdowns: ".dropdown",
            utilMenuActiveOption: "menu__option--active",
            notiToggle: "notifications",
            alarmAudio: "alarm",
            previewAlarmAudio: "previewAlarm",
            alarmVolume: "alarmVolume",
            volumeBubble: ".volume__value",
            ambiAudio: "ambience",
            ambiVolume: "ambiVolume",
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
        this.timerInputInfoBtn = document.querySelectorAll(`${this.selectors.timerInputInfoBtn}`);
        this.toggles = document.querySelectorAll(`[${this.selectors.toggles}]`);
        this.dropdowns = document.querySelectorAll(`${this.selectors.dropdowns}`);
        this.colorPalette = document.querySelectorAll(`${this.selectors.colorInput}`);
        this.notiToggle = document.getElementById(`${this.selectors.notiToggle}`);
        this.alarmAudio = document.getElementById(`${this.selectors.alarmAudio}`);
        this.previewAlarmAudio = document.getElementById(`${this.selectors.previewAlarmAudio}`);
        this.alarmVolume = document.getElementById(`${this.selectors.alarmVolume}`);
        this.volumeBubble = document.querySelector(`${this.selectors.volumeBubble}`);
        this.ambiAudio = document.getElementById(`${this.selectors.ambiAudio}`);
        this.ambiVolume = document.getElementById(`${this.selectors.ambiVolume}`);

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
            "color": 0,
            "alarmSound": 1,
            "selctedAlarm": 2,
            "alarmVolAt": 50,
            "ambiSound": 1,
            "selectedAmbi": 2,
            "ambiVolAt": 50,
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
            const selectField = dropdown.querySelector(".select");
            const audio = selectField.querySelector("audio");
            const selectedOption = selectField.querySelector(".select__selected");
            const options = dropdown.querySelectorAll(".menu__option");
            const menuSoundName = dropdown.querySelectorAll(".menu__sound-name");

            const selectedIndex = this.storedData[dropdown.dataset.sound];

            options[selectedIndex].classList.add(this.menuActiveOptionClass);
            selectedOption.innerText = menuSoundName[selectedIndex].innerText;

            if (audio.id === "alarm") audio.src = allAlarmSounds[selectedIndex];
            if (audio.id === "ambience") {
                if (selectedIndex == 1) playCodeRadio(audio);
                else audio.src = allAmbientTracks[selectedIndex];
            }
        });

        this.alarmVolume.value = this.storedData["alarmVolAt"];
        this.handleAlarmVolume();
        this.ambiVolume.value = this.storedData["ambiVolAt"];
        this.handleAmbienceVolume();
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
                input.value = this.validateTimerInput(input.value);
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

        this.timerInputInfoBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                toast.show(`${icons.info}`, "Info", "Please stop or reset the timer to edit the time.");
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
            const mainAudio = selectField.querySelector("audio");
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

                    if (mainAudio.id === "alarm") {
                        selectedOption.dataset.selectedAlarm = optIndex;
                        mainAudio.src = allAlarmSounds[optIndex];
                    }
                    if (mainAudio.id === "ambience") {
                        selectedOption.dataset.selectedAmbi = optIndex;

                        if (optIndex == 1) playCodeRadio(mainAudio);
                        else {
                            mainAudio.src = allAmbientTracks[optIndex];
                            if (mainAudio.dataset.currStatus === "playing") {
                                mainAudio.play();
                                insertNowPlaying();
                            }
                        }
                    }

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
            this.handleAlarmVolume();
            this.storedData["alarmVolAt"] = this.alarmVolume.value;
            localStorage.setItem("appState", JSON.stringify(this.storedData));
        });

        this.ambiVolume.addEventListener("input", () => {
            this.handleAmbienceVolume();
            this.storedData["ambiVolAt"] = this.ambiVolume.value;
            localStorage.setItem("appState", JSON.stringify(this.storedData));
        });
    }

    handleAlarmVolume() {
        const volumeVal = document.querySelector(".volume__value.alarmVal");
        const volumeProgress = document.querySelector(".volume__progress.alarmProgress");

        volumeVal.innerHTML = `${this.alarmVolume.value}%`;
        volumeProgress.style.width = `${this.alarmVolume.value}%`;

        let vol = this.alarmVolume.value / 100;
        this.previewAlarmAudio.volume = vol;
        this.alarmAudio.volume = vol;
    }

    handleAmbienceVolume() {
        const volumeVal = document.querySelector(".volume__value.ambiVal");
        const volumeProgress = document.querySelector(".volume__progress.ambiProgress");

        volumeVal.innerHTML = `${this.ambiVolume.value}%`;
        volumeProgress.style.width = `${this.ambiVolume.value}%`;

        let vol = this.ambiVolume.value / 100;
        this.ambiAudio.volume = vol;
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
                this.enableNowPlaying();
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
            case "nowPlaying":
                removeNowPlaying();
                break;
            default:
                return;
        }
        /* eslint-enable indent */
    }

    enableNotifications() {
        this.askNotificationPermission();
    }

    enableDarkMode() {
        this.body.dataset.theme = "dark";
    }

    disableDarkMode() {
        this.body.dataset.theme = "light";
    }

    enableTimerInTitle() {
    }

    enableNowPlaying() {
        if (this.ambiAudio.dataset.currStatus === "playing") {
            insertNowPlaying();
        }
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

    validateTimerInput(inputValue) {
        if (inputValue === "0" || inputValue === "")
            return 1;
        if (inputValue > 90)
            return 90;

        return inputValue;
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
    }

    removeExistingActiveClass() {
        this.navBtns.forEach(btn => btn.classList.remove(this.activeTabClass));
    }

}