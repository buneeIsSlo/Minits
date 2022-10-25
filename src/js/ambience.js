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
        };

        this.ambienceBtn = document.querySelector(this.selectors.ambienceBtn);
        this.ambienceOnIcon = document.getElementById(this.selectors.ambienceOnIcon);
        this.ambienceOffIcon = document.getElementById(this.selectors.ambienceOffIcon);

        return true;
    }

    setUpEvents() {
        this.handleAmbienceBtn();
    }

    handleAmbienceBtn() {
        this.ambienceBtn.addEventListener("click", () => {
            this.ambienceOnIcon.classList.toggle("hide");
            this.ambienceOffIcon.classList.toggle("hide");
        });
    }
}