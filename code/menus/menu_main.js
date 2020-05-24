"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    var playBtn = document.getElementById("playBtn");
    var optionsBtn = document.getElementById("optionsBtn");
    var helpBtn = document.getElementById("helpBtn");
    var creditsBtn = document.getElementById("creditsBtn");
    var closeBtn = document.getElementById("closeBtn");

    playBackgroundMusic()

    playBtn.addEventListener("mouseup", menuPlay);
    playBtn.addEventListener("mouseenter", playSound);
    optionsBtn.addEventListener("mouseup", menuOptions);
    optionsBtn.addEventListener("mouseenter", playSound);
    helpBtn.addEventListener("mouseup", menuHelp);
    helpBtn.addEventListener("mouseenter", playSound);
    creditsBtn.addEventListener("mouseup", menuCredits);
    creditsBtn.addEventListener("mouseenter", playSound);
    closeBtn.addEventListener("mouseup", menuClose);
    closeBtn.addEventListener("mouseenter", playSound);
}

function menuPlay() {
    location.replace("menu_play.html")
}


function menuOptions() {
    location.replace("menu_options.html")
}

function menuHelp() {
    location.replace("menu_help.html")
}

function menuCredits() {
    location.replace("menu_credits.html")
}

function menuClose() {
    window.close();
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