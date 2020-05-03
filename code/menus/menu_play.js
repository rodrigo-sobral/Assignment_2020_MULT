"use strict";

(function() {
    window.addEventListener("load", main);
}());

function main() {
    var newBtn= document.getElementById("newBtn");
    var loadBtn= document.getElementById("loadBtn");
    var deleteBtn= document.getElementById("deleteBtn");
    var backBtn= document.getElementById("backBtn");

    newBtn.addEventListener("mouseup", newGameMenu)
    backBtn.addEventListener("mouseup",backMainMenu);
    
    newBtn.addEventListener("mouseenter",playSound);
    loadBtn.addEventListener("mouseenter",playSound);
    deleteBtn.addEventListener("mouseenter",playSound);
    backBtn.addEventListener("mouseenter",playSound);

}

function backMainMenu() { location.replace("../../index.html") }
function newGameMenu() { location.replace("../../html/menu_newgame.html") }

function playSound() {
    var sound= new Audio("../../resources/sounds/buttonSwitchSound.mp3")
    sound.play()
}