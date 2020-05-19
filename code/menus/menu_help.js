"use strict";

(function() {
    window.addEventListener("load", main);
}());

function main() {
    var backBtn= document.getElementById("backBtn");

    backBtn.addEventListener("mouseup",backMenu);
    backBtn.addEventListener("mouseenter",playSound);
}

function backMenu() { location.replace("menu_main.html") }
function playSound() {
    var sound= new Audio("../../resources/sounds/buttonSwitchSound.mp3")
    sound.play()
}
