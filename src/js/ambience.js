export default class Ambience {
    constructor() {
        if (!this.vars()) return false;

        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            ambienceBtn: ".minits__ambience",
            ambienceOnIcon: "ambienceOnIcon",
            ambienceOffIcon: "ambienceOffIcon",
            ambienceAudo: "ambience"
        };

        this.ambienceBtn = document.querySelector(this.selectors.ambienceBtn);
        this.ambienceOnIcon = document.getElementById(this.selectors.ambienceOnIcon);
        this.ambienceOffIcon = document.getElementById(this.selectors.ambienceOffIcon);
        this.ambienceAudio = document.getElementById(this.selectors.ambienceAudo);

        return true;
    }

    setUpEvents() {
        this.handleAmbienceBtn();
    }

    handleAmbienceBtn() {
        this.ambienceBtn.addEventListener("click", async () => {
            this.ambienceOnIcon.classList.toggle("hide");
            this.ambienceOffIcon.classList.toggle("hide");

            this.playCodeRadio();
        });
    }

    async playCodeRadio() {

        if (this.ambienceOnIcon.classList.contains("hide")) {
            this.ambienceAudio.src = "";
            this.ambienceAudio.pause();
            return;
        }

        const API_URL = "https://coderadio-admin.freecodecamp.org/api/live/nowplaying/coderadio";

        const response = await fetch(API_URL, { cache: "no-cache" });
        const json = await response.json();

        console.log(json);
        const LISTEN_URL = json.station.listen_url;

        this.ambienceAudio.src = LISTEN_URL;
        this.ambienceAudio.play();
    }
}