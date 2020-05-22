"use strict"

class Sound {
    constructor(path, volume,effectsVolume) {
        this.path = path
        this.volume = volume
        this.effectsVolume = effectsVolume
    }

    saveSound() {
        localStorage.setItem('sound', JSON.stringify(this));
    }
}