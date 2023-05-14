const infoIcon = `<svg class="toast__icon" id="infoIcon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 9C9.73479 9 9.48043 9.10536 9.2929 9.29289C9.10536 9.48043 9 9.73478 9 10V14C9 14.2652 9.10536 14.5196 9.2929 14.7071C9.48043 14.8946 9.73479 15 10 15C10.2652 15 10.5196 14.8946 10.7071 14.7071C10.8946 14.5196 11 14.2652 11 14V10C11 9.73478 10.8946 9.48043 10.7071 9.29289C10.5196 9.10536 10.2652 9 10 9ZM10.38 5.08C10.1365 4.97998 9.86347 4.97998 9.62 5.08C9.49725 5.12759 9.38511 5.19896 9.29 5.29C9.20167 5.3872 9.13065 5.49881 9.08 5.62C9.02402 5.73868 8.99662 5.86882 9 6C8.99924 6.13161 9.02447 6.26207 9.07423 6.38391C9.124 6.50574 9.19732 6.61656 9.29 6.71C9.38721 6.79833 9.49882 6.86936 9.62 6.92C9.7715 6.98224 9.93597 7.00632 10.099 6.99011C10.2619 6.97391 10.4184 6.91792 10.5547 6.82707C10.691 6.73622 10.8029 6.61328 10.8805 6.46907C10.9582 6.32486 10.9992 6.16378 11 6C10.9963 5.73523 10.8927 5.48163 10.71 5.29C10.6149 5.19896 10.5028 5.12759 10.38 5.08ZM10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0V0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18V18Z" fill="black"/>
</svg>`;

const checkIcon = `<svg class="toast__icon" id="checkIcon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.72 6.79L8.43001 11.09L6.78 9.44C6.69036 9.33532 6.58004 9.2503 6.45597 9.19027C6.33191 9.13025 6.19678 9.09652 6.05906 9.0912C5.92134 9.08588 5.78401 9.10909 5.65568 9.15936C5.52736 9.20964 5.41081 9.28589 5.31335 9.38335C5.2159 9.4808 5.13964 9.59735 5.08937 9.72568C5.03909 9.854 5.01589 9.99133 5.02121 10.1291C5.02653 10.2668 5.06026 10.4019 5.12028 10.526C5.1803 10.65 5.26532 10.7604 5.37 10.85L7.72 13.21C7.81344 13.3027 7.92426 13.376 8.0461 13.4258C8.16794 13.4755 8.2984 13.5008 8.43001 13.5C8.69234 13.4989 8.94374 13.3947 9.13 13.21L14.13 8.21C14.2237 8.11704 14.2981 8.00644 14.3489 7.88458C14.3997 7.76272 14.4258 7.63201 14.4258 7.5C14.4258 7.36799 14.3997 7.23728 14.3489 7.11542C14.2981 6.99356 14.2237 6.88296 14.13 6.79C13.9426 6.60375 13.6892 6.49921 13.425 6.49921C13.1608 6.49921 12.9074 6.60375 12.72 6.79ZM10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0V0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18V18Z" fill="black"/>
</svg>`;

const errorIcon = `<svg class="toast__icon" id="errorIcon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.71 7.29002C14.617 7.19629 14.5064 7.1219 14.3846 7.07113C14.2627 7.02036 14.132 6.99422 14 6.99422C13.868 6.99422 13.7373 7.02036 13.6154 7.07113C13.4936 7.1219 13.383 7.19629 13.29 7.29002L11 9.59002L8.70999 7.29002C8.52168 7.10171 8.26629 6.99593 7.99999 6.99593C7.73369 6.99593 7.47829 7.10171 7.28999 7.29002C7.10168 7.47832 6.9959 7.73372 6.9959 8.00002C6.9959 8.26632 7.10168 8.52171 7.28999 8.71002L9.58999 11L7.28999 13.29C7.19626 13.383 7.12187 13.4936 7.0711 13.6154C7.02033 13.7373 6.99419 13.868 6.99419 14C6.99419 14.132 7.02033 14.2627 7.0711 14.3846C7.12187 14.5065 7.19626 14.6171 7.28999 14.71C7.38295 14.8037 7.49355 14.8781 7.61541 14.9289C7.73727 14.9797 7.86798 15.0058 7.99999 15.0058C8.132 15.0058 8.26271 14.9797 8.38456 14.9289C8.50642 14.8781 8.61702 14.8037 8.70999 14.71L11 12.41L13.29 14.71C13.383 14.8037 13.4936 14.8781 13.6154 14.9289C13.7373 14.9797 13.868 15.0058 14 15.0058C14.132 15.0058 14.2627 14.9797 14.3846 14.9289C14.5064 14.8781 14.617 14.8037 14.71 14.71C14.8037 14.6171 14.8781 14.5065 14.9289 14.3846C14.9796 14.2627 15.0058 14.132 15.0058 14C15.0058 13.868 14.9796 13.7373 14.9289 13.6154C14.8781 13.4936 14.8037 13.383 14.71 13.29L12.41 11L14.71 8.71002C14.8037 8.61706 14.8781 8.50645 14.9289 8.38459C14.9796 8.26274 15.0058 8.13203 15.0058 8.00002C15.0058 7.86801 14.9796 7.7373 14.9289 7.61544C14.8781 7.49358 14.8037 7.38298 14.71 7.29002V7.29002ZM18.07 3.93002C17.1475 2.97492 16.0441 2.21309 14.824 1.689C13.604 1.16491 12.2918 0.889052 10.964 0.877514C9.63621 0.865976 8.31941 1.11899 7.09045 1.6218C5.86148 2.12461 4.74497 2.86714 3.80604 3.80607C2.86711 4.745 2.12458 5.86151 1.62177 7.09048C1.11896 8.31944 0.865945 9.63624 0.877483 10.964C0.889021 12.2918 1.16488 13.604 1.68897 14.8241C2.21306 16.0441 2.97489 17.1476 3.92999 18.07C4.85246 19.0251 5.9559 19.7869 7.17594 20.311C8.39598 20.8351 9.70818 21.111 11.036 21.1225C12.3638 21.1341 13.6806 20.881 14.9095 20.3782C16.1385 19.8754 17.255 19.1329 18.1939 18.194C19.1329 17.255 19.8754 16.1385 20.3782 14.9096C20.881 13.6806 21.134 12.3638 21.1225 11.036C21.111 9.70821 20.8351 8.39601 20.311 7.17597C19.7869 5.95593 19.0251 4.85249 18.07 3.93002V3.93002ZM16.66 16.66C15.352 17.9694 13.6305 18.7848 11.7888 18.9673C9.94704 19.1498 8.09899 18.6881 6.55951 17.6608C5.02003 16.6335 3.88435 15.1042 3.34596 13.3335C2.80758 11.5628 2.89979 9.66016 3.6069 7.9498C4.31401 6.23945 5.59226 4.82717 7.22388 3.95358C8.8555 3.07999 10.7395 2.79915 12.555 3.15889C14.3705 3.51863 16.005 4.49671 17.1802 5.92648C18.3554 7.35625 18.9985 9.14926 19 11C19.0036 12.0513 18.7986 13.0929 18.3969 14.0644C17.9953 15.0359 17.4049 15.9182 16.66 16.66V16.66Z" fill="black"/>
</svg>`;

export const icons = {
    info: infoIcon,
    check: checkIcon,
    error: errorIcon
};

export const setTime = (seconds, timerDisplay, format = false) => {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    mins = mins < 10 ? `0${mins}` : mins;
    secs = secs < 10 ? `0${secs}` : secs;

    if (format) {
        timerDisplay.innerHTML = ` Minits - [ ${mins}:${secs} ]`;
    }
    else {
        timerDisplay.innerHTML = `${mins}:${secs}`;
    }
};

export const timerEdits = (timerRunning, type) => {
    const timerInputs = [...document.querySelectorAll(".minits__settings-timer-input")];
    const inp = document.querySelector(`[data-timer-type="${type}"]`);
    const infoIcon = document.querySelectorAll(".stop-timer-info");

    if (timerRunning) {
        const currentTimerIndex = timerInputs.findIndex(inp => inp.dataset.timerType === type);
        infoIcon[currentTimerIndex].classList.remove("hide");
        inp.setAttribute("disabled", true);
    }
    else {
        timerInputs.forEach((input, i) => {
            input.removeAttribute("disabled");
            infoIcon[i].classList.add("hide");
        });
    }
};

export const pulseTimer = () => {
    const timerContainer = document.querySelector(".minits__timer-inner");

    timerContainer.classList.add("pulse");

    timerContainer.addEventListener("webkitAnimationEnd", () => {
        timerContainer.classList.remove("pulse");
    });
};

export const playCodeRadio = async (audio) => {

    const API_URL = "https://coderadio-admin.freecodecamp.org/api/live/nowplaying/coderadio";

    const response = await fetch(API_URL, { cache: "no-cache" });
    const json = await response.json();

    const LISTEN_URL = json.station.listen_url;

    audio.src = LISTEN_URL;
    if (audio.dataset.currStatus === "playing") {
        audio.play();
        insertNowPlaying();
    }
};


const timerContainer = document.querySelector(".minits__timer-container");
const nowPlayingtoggle = document.getElementById("nowPlaying");

export const insertNowPlaying = () => {
    if (!nowPlayingtoggle.checked) return;

    removeNowPlaying();

    const track = document.querySelector("[data-selected-ambi]").innerHTML;
    let playingNode = document.createElement("p");

    playingNode.className = "now-playing";
    playingNode.innerHTML = `🎶 Now playing — ${track}`;
    timerContainer.appendChild(playingNode);
};

export const removeNowPlaying = () => {
    let playingNode = document.querySelector(".now-playing");

    if (playingNode) {
        playingNode.parentNode.removeChild(playingNode);
    }
};