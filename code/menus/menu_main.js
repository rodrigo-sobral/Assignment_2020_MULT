"use strict";

(function() {
    window.addEventListener("load", main);
}());

function main() {
    //var backgroundMusic= new Audio("../resources/sounds/menuBackgroundMusic.mp3")
    //backgroundMusic.id="backgroundMusic"
    //backgroundMusic.play()
    var playBtn= document.getElementById("playBtn");
    var optionsBtn= document.getElementById("optionsBtn");
    var helpBtn= document.getElementById("helpBtn");
    var creditsBtn= document.getElementById("creditsBtn");
    var closeBtn= document.getElementById("closeBtn");

    playBtn.addEventListener("mouseup",menuPlay);
    playBtn.addEventListener("mouseenter", playSound);
    optionsBtn.addEventListener("mouseup",menuOptions);
    optionsBtn.addEventListener("mouseenter", playSound);
    helpBtn.addEventListener("mouseup",menuHelp);
    helpBtn.addEventListener("mouseenter", playSound);
    creditsBtn.addEventListener("mouseup",menuCredits);
    creditsBtn.addEventListener("mouseenter", playSound);
    closeBtn.addEventListener("mouseup",menuClose);
    closeBtn.addEventListener("mouseenter", playSound);
}

function menuPlay() { location.replace("menu_play.html") }
function menuRanking() { location.replace("menu_rankings.html") }
function menuOptions() { location.replace("menu_options.html") }
function menuHelp() { location.replace("menu_help.html") }
function menuCredits() { location.replace("menu_credits.html") }
function menuClose() { window.close(); }
function playSound() {
    var sound= new Audio("../../resources/sounds/buttonSwitchSound.mp3")
    sound.play()
}