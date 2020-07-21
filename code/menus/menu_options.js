"use strict";

(function () {
    window.addEventListener("load", main);
}());

//backgroundMusic.play()

function main() {
    var plusMusicBtn = document.getElementById("plusMusicBtn")
    var minusMusicBtn = document.getElementById("minusMusicBtn")
    var muteMusicBtn = document.getElementById("muteMusicBtn")

    var plusSoundBtn = document.getElementById("plusSoundBtn")
    var minusSoundBtn = document.getElementById("minusSoundBtn")
    var muteSoundBtn = document.getElementById("muteSoundBtn")

    var backBtn = document.getElementById("backBtn")

    playBackgroundMusic()

    plusMusicBtn.addEventListener("mouseup", volumeUpMusic)
    minusMusicBtn.addEventListener("mouseup", volumeDownMusic)
    muteMusicBtn.addEventListener("mouseup", mute)

    plusSoundBtn.addEventListener("mouseup", volumeUpEffects)
    minusSoundBtn.addEventListener("mouseup", volumeDownEffects)
    muteSoundBtn.addEventListener("mouseup", mute)

    backBtn.addEventListener("mouseup", backMainMenu)

    minusMusicBtn.addEventListener("mouseenter", playSound)
    plusMusicBtn.addEventListener("mouseenter", playSound)
    muteMusicBtn.addEventListener("mouseenter", playSound)
    muteSoundBtn.addEventListener("mouseenter", playSound)
    plusSoundBtn.addEventListener("mouseenter", playSound)
    minusSoundBtn.addEventListener("mouseenter", playSound)
    backBtn.addEventListener("mouseenter", playSound)
}

function backMainMenu() {
    location.replace("../index.html")
}

function volumeUpEffects(ev) {
    var music = JSON.parse(localStorage.getItem('sound'));
    if (music.effectsVolume < 1) {
        music.effectsVolume = Math.round(music.effectsVolume* 10)/10 + 0.1
        if (music.effectsVolume >= 0.1) {
            var soundOn2 = document.getElementById("soundOn2")
            var soundOff2 = document.getElementById("soundOff2")
            soundOff2.style.opacity = 0
            soundOn2.style.opacity = 1
        }
    }
    localStorage.setItem('sound', JSON.stringify(music));
}

function volumeDownEffects(ev) {
    var music = JSON.parse(localStorage.getItem('sound'));
    if (music.effectsVolume > 0) {
        music.effectsVolume = Math.round(music.effectsVolume * 10) / 10 - 0.1
        if (music.effectsVolume == 0) {
            var soundOn2 = document.getElementById("soundOn2")
            var soundOff2 = document.getElementById("soundOff2")
            soundOff2.style.opacity = 1
            soundOn2.style.opacity = 0
            music.effectsVolume = 0
        }
    }

    localStorage.setItem('sound', JSON.stringify(music));
}

function volumeUpMusic(ev) {
    var music = JSON.parse(localStorage.getItem('sound'));
    if (music.volume < 1) {
        music.volume = Math.round(music.volume* 10)/10 + 0.1
        if (music.volume >= 0.1) {
            var soundOn1 = document.getElementById("soundOn1")
            var soundOff1 = document.getElementById("soundOff1")
            soundOff1.style.opacity = 0
            soundOn1.style.opacity = 1
        }
    }
    localStorage.setItem('sound', JSON.stringify(music));
    playBackgroundMusic()
}

function volumeDownMusic(ev) {
    var music = JSON.parse(localStorage.getItem('sound'));
    if (music.volume > 0) {
        music.volume = Math.round(music.volume* 10)/10 - 0.1
        if(music.volume == 0) {
            var soundOn1 = document.getElementById("soundOn1")
            var soundOff1 = document.getElementById("soundOff1")
            soundOff1.style.opacity = 1
            soundOn1.style.opacity = 0
            music.volume = 0
        }
    }
    localStorage.setItem('sound', JSON.stringify(music));
    playBackgroundMusic()
}

function mute(ev) {
    var soundOn1 = document.getElementById("soundOn1")
    var soundOn2 = document.getElementById("soundOn2")
    var soundOff1 = document.getElementById("soundOff1")
    var soundOff2 = document.getElementById("soundOff2")
    var music = JSON.parse(localStorage.getItem('sound'));

    if (ev.currentTarget.id == "muteMusicBtn") {
        if (music.volume >= 0.1) {
            soundOn1.style.opacity = 0
            soundOff1.style.opacity = 1

            music.volume = 0
            localStorage.setItem('sound', JSON.stringify(music));
            playBackgroundMusic()

        } else {
            soundOn1.style.opacity = 1
            soundOff1.style.opacity = 0

            music.volume = 1
            localStorage.setItem('sound', JSON.stringify(music));
            playBackgroundMusic()
        }

    } else {
        if (music.effectsVolume >= 0.1) {
            soundOn2.style.opacity = 0
            soundOff2.style.opacity = 1

            music.effectsVolume = 0
            localStorage.setItem('sound', JSON.stringify(music));
        } else {
            soundOn2.style.opacity = 1
            soundOff2.style.opacity = 0

            music.effectsVolume = 1
            localStorage.setItem('sound', JSON.stringify(music));
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