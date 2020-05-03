"use strict";

(function() {
    window.addEventListener("load", main);
}());

function main() {
    var backBtn= document.getElementById("backBtn");

    backBtn.addEventListener("mouseup",muda_menu);
    backBtn.addEventListener("mouseenter",playSound);
}
function muda_menu() { location.replace("../../index.html") }
function playSound() {
    var sound= new Audio("../../resources/sounds/buttonSwitchSound.mp3")
    sound.play()
}