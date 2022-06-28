import { animationToastIn, animationToastOut, addAnimation } from "./animations";

export default class Toast {
    constructor() {
        if (!this.vars()) return false;
        this.setUpEvents();
    }

    vars() {
        this.index = 0;
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
        this.index += 1;

        this.toastElement = document.createElement("div");
        this.toastElement.className = "toast__item";
        this.toastElement.setAttribute("data-toast", `${this.index}`);
        this.toastWrapper.appendChild(this.toastElement);

        let element = document.querySelector(`[data-toast="${this.index}"]`);
        this.anim(element);

        if (this.toastWrapper.childNodes.length > 1) {
            this.clear();
        }
    }

    anim(element) {
        console.log(element);

        let toastIn = addAnimation(element, animationToastIn, {
            duration: 500,
            fill: "forwards"
        });

        setTimeout(() => {
            toastIn.cancel();

            let toastOut = addAnimation(element, animationToastOut, {
                duration: 500,
                fill: "forwards"
            });

            toastOut.onfinish = () => {
                element.remove();
            }

            console.log(toastOut);
        }, 2000);

    }

    show(icon, state, message) {
        this.createToastElement();
        let content = `<span class="toast__icon--wrapper">${icon}</span>
                       <div class="toast__content">
                            <span class="toast__state">${state}</span>
                            <span class="toast__message">${message}</span>
                       </div>`;
        this.toastElement.innerHTML = content;
    }

    clear() {
        this.toastWrapper.removeChild(this.toastWrapper.firstChild);
    }
}