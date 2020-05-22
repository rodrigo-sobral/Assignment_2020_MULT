"use strict";

(function() {
    window.addEventListener("load", main);
}());

function main() {
    var playBtn= document.getElementById("playBtn");
    var backBtn= document.getElementById("backBtn");

    playBackgroundMusic()

    playBtn.addEventListener("mouseup", startGame)
    backBtn.addEventListener("mouseup",backMainMenu);
    
    playBtn.addEventListener("mouseenter",playSound);
    backBtn.addEventListener("mouseenter",playSound);

}

function backMainMenu() { location.replace("menu_play.html") }
function startGame() { 
    var input= document.getElementsByTagName("input")[0]
    if (input.value=="") {
        window.alert("First, tell me your name!")
    } else {
        if (confirm("Delete saved data?")) {
            if (confirm("All the data from the previous game will be deleted and you won't be able to recover it. Are you sure u want to proceed?")) {
                let new_career = new Carreira(input.value,"11")
                localStorage.setItem('career', JSON.stringify(new_career));
                location.replace("game.html")
            }
        }
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