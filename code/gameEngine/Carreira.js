"use strict"

class Carreira {
    constructor(name, level) {
        this.name = name
        this.level = level
    }

    saveCareer() {
        localStorage.setItem('career', JSON.stringify(this));
        localStorage.setItem('level', '00');
    }
}