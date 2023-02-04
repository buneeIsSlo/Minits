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
            ambienceAudio: "ambience"
        };

        this.ambienceBtn = document.querySelector(this.selectors.ambienceBtn);
        this.ambienceOnIcon = document.getElementById(this.selectors.ambienceOnIcon);
        this.ambienceOffIcon = document.getElementById(this.selectors.ambienceOffIcon);
        this.ambienceAudio = document.getElementById(this.selectors.ambienceAudio);

        return true;
    }

    setUpEvents() {
        this.handleAmbienceBtn();
    }

    handleAmbienceBtn() {
        this.ambienceBtn.addEventListener("click", async () => {
            this.ambienceOnIcon.classList.toggle("hide");
            this.ambienceOffIcon.classList.toggle("hide");

            if (this.ambienceOnIcon.classList.contains("hide")) {
                this.ambienceAudio.pause();
                this.ambienceAudio.dataset.currStatus = "paused";
            }
            else {
                this.ambienceAudio.play();
                this.ambienceAudio.dataset.currStatus = "playing";
            }
        });
    }

}