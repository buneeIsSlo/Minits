export const music = (elementClass) => {
    let audioElement = document.getElementById(elementClass);
    console.log(audioElement);

    audioElement.play();

    setTimeout(() => {
        audioElement.pause();
    }, 1000);
}