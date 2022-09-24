// Object with animations keyframes
let animations = {
    fadeIn: [
        {
            opacity: "0",
            transform: "scaleY(0)",
            transformOrigin: "top"
        },
        {
            opacity: "1",
            transform: "scaleY(1)"
        }
    ],

    fadeOut: [
        {
            opacity: "1",
            transform: "scaleY(1)"
        },
        {
            opacity: "0",
            transform: "scaleY(0)"
        }
    ],

    toastIn: [
        {
            opacity: "0",
            transform: "translateY(-20px)"
        },
        {
            opacity: "0"
        },
        {
            opacity: "1",
            transform: "translateY(0)",
            visibility: "visible"
        }
    ],

    toastOut: [
        {
            opacity: "1",
            transform: "translateY(0)",
            visibility: "visible"
        },
        {
            opacity: "0"
        },
        {
            opacity: "0",
            transform: "translateY(-20px)",
            visibility: "hidden"
        }
    ]
};

let fadeIn = animations.fadeIn;
let fadeOut = animations.fadeOut;
let toastIn = animations.toastIn;
let toastOut = animations.toastOut;

const addAnimation = (element, animation, options) => {
    return element.animate(animation, options);
};

export { fadeIn as animationFadeIn, fadeOut as animationFadeOut, toastIn as animationToastIn, toastOut as animationToastOut, addAnimation };