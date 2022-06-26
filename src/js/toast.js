export default class Toast {
    constructor() {
        if (!this.vars()) return false;
        this.setUpEvents();
    }

    vars() {
        return true;
    }

    setUpEvents() {
        console.log("toast");
        this.createToastWrapper();
        this.toastWrapper.addEventListener("click", () => this.clear());
    }

    createToastWrapper() {
        this.toastWrapper = document.createElement("div");
        this.toastWrapper.className = "toast";
        document.body.appendChild(this.toastWrapper);
    }

    createToastElement() {
        this.toastElement = document.createElement("div");
        this.toastElement.className = "toast__item";
        this.toastWrapper.appendChild(this.toastElement);

        if (this.toastWrapper.childNodes.length > 2) {
            this.clear();
        }
    }

    show(message) {
        this.createToastElement();

        this.toastElement.innerHTML = message;
    }

    clear() {
        this.toastWrapper.removeChild(this.toastWrapper.firstChild);
    }
}