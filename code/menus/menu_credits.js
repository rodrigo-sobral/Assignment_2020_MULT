"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    var backBtn = document.getElementById("backBtn");
    playBackgroundMusic()
    backBtn.addEventListener("mouseup", muda_menu);
    backBtn.addEventListener("mouseenter", playSound);
}

function muda_menu() {
    location.replace("menu_main.html")
}

function playSound() {
    var sound = new Audio("../../resources/sounds/buttonSwitchSound.mp3")
    var music = JSON.parse(localStorage.getItem('sound'));
    sound.volume = music.effectsVolume
    sound.play()
}

function playBackgroundMusic() {
    if (localStorage.getItem('sound') === null) {
        var backgroundMusic = new Sound(1, 1)
        localStorage.setItem('sound', JSON.stringify(backgroundMusic));
    } else {
        var backgroundMusic = JSON.parse(localStorage.getItem('sound'));
    }
    var sound = new Audio("../../resources/sounds/menuBackgroundMusic.mp3")
    sound.volume = backgroundMusic.volume
    sound.loop = true
    sound.autoplay = true
    sound.play()
}