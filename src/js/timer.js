export default class Timer {

    constructor(timerType, time) {
        this.timerType = timerType;
        this.time = time;

        if (!this.vars()) return false;
        this.setUpEvents();
    }

    vars() {
        this.selectors = {
            minitsTime: ".minits__time"
        }

        this.minitsTime = document.querySelector(`${this.selectors.minitsTime}`);

        return true;
    }

    setUpEvents() {
        let test = 60
        setInterval(() => {
            test -= 1;
            this.minitsTime.innerHTML = `${test}:00`
        }, 1000)
    }
}