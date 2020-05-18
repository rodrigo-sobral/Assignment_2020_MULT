"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    var newBtn = document.getElementById("newBtn");
    var loadBtn = document.getElementById("loadBtn");
    var backBtn = document.getElementById("backBtn");

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
    sound.play()
}