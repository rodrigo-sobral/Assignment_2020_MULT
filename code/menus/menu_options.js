"use strict";

(function() {
    window.addEventListener("load", main);
}());
//backgroundMusic.play()

function main() {
    var plusMusicBtn= document.getElementById("plusMusicBtn")
    var minusMusicBtn= document.getElementById("minusMusicBtn")
    var muteMusicBtn= document.getElementById("muteMusicBtn")
    
    var plusSoundBtn= document.getElementById("plusSoundBtn")
    var minusSoundBtn= document.getElementById("minusSoundBtn")
    var muteSoundBtn= document.getElementById("muteSoundBtn")
    
    var backBtn= document.getElementById("backBtn")

    plusMusicBtn.addEventListener("mouseup",volumeUp)
    minusMusicBtn.addEventListener("mouseup",volumeDown)
    muteMusicBtn.addEventListener("mouseup",mute)
    
    plusSoundBtn.addEventListener("mouseup",volumeUp)
    minusSoundBtn.addEventListener("mouseup",volumeDown)
    muteSoundBtn.addEventListener("mouseup",mute)
    
    backBtn.addEventListener("mouseup",backMainMenu)

    minusMusicBtn.addEventListener("mouseenter",playSound)
    plusMusicBtn.addEventListener("mouseenter",playSound)
    muteMusicBtn.addEventListener("mouseenter",playSound)
    muteSoundBtn.addEventListener("mouseenter",playSound)
    plusSoundBtn.addEventListener("mouseenter",playSound)
    minusSoundBtn.addEventListener("mouseenter",playSound)
    backBtn.addEventListener("mouseenter",playSound)
}

function backMainMenu() { location.replace("../../html/index.html") }
function playSound() {
    var sound= new Audio("../../resources/sounds/buttonSwitchSound.mp3")
    sound.play()
}

function volumeUp(ev) {

}
function volumeDown(ev) {

}
function mute(ev) {
    var soundOn1= document.getElementById("soundOn1")
    var soundOn2= document.getElementById("soundOn2")
    var soundOff1= document.getElementById("soundOff1")
    var soundOff2= document.getElementById("soundOff2")
    if (ev.currentTarget.id=="muteMusicBtn") {
        if (soundOn1.style.opacity==1) {
            soundOn1.style.opacity=0
            soundOff1.style.opacity=1
        } else {
            soundOn1.style.opacity=1
            soundOff1.style.opacity=0
        } 
    } else {
        if (soundOn2.style.opacity==1) {
            soundOn2.style.opacity=0
            soundOff2.style.opacity=1
        } else {
            soundOn2.style.opacity=1
            soundOff2.style.opacity=0
        }
    }
}