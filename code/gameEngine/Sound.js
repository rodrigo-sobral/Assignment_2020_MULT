"use strict"

class Sound {
    constructor(path, volume) {
        this.path = path
        this.volume = volume
    }

    saveCareer() {
        localStorage.setItem('sound', JSON.stringify(this));
    }
}