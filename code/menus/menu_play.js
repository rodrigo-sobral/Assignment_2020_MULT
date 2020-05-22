"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    var newBtn = document.getElementById("newBtn");
    var loadBtn = document.getElementById("loadBtn");
    var backBtn = document.getElementById("backBtn");

    playBackgroundMusic()

    newBtn.addEventListener("mouseup", newGameMenu)
    loadBtn.addEventListener("mouseup", loadGameEngine)
    backBtn.addEventListener("mouseup", backMainMenu);

    newBtn.addEventListener("mouseenter", playSound);
    loadBtn.addEventListener("mouseenter", playSound);
    backBtn.addEventListener("mouseenter", playSound);

}

function backMainMenu() {
    location.replace("menu_main.html")
}

function newGameMenu() {
    location.replace("menu_newgame.html")
}

function loadGameEngine() {
    if (localStorage.getItem('career') === null) {
        alert("There is no game to be loaded")
    }
    else{
        location.replace("game.html")
    }
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