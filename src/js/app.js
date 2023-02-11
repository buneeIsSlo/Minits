/* eslint-disable no-unused-vars */

import "../css/sanitize.css";
import "../css/custom.css";
import "../css/toast.css";
import "../css/main.css";

import Settings from "./settings.js";
import Timer from "./timer.js";
import Ambience from "./ambience";

console.log("bunee!");
const settings = new Settings();
const timer = new Timer();
const ambience = new Ambience();

// Register service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then(registration => {
            console.log("SW registered: ", registration);
        }).catch(registrationError => {
            console.log("SW registration failed: ", registrationError);
        });
    });
}