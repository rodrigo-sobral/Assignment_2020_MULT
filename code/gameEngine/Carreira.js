"use strict"

class Carreira {
    constructor(name, level) {
        this.name = name
        this.level = level
    }

    saveCareer() {
        const fs = require('fs')
        let data = this.name + " " + this.level
        fs.writeFile('../Save/Career.txt', data, (err) => {
            if (err) throw err;
        })
    }
}