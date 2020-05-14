"use strict"

class Carreira {
    constructor(name, level) {
        this.name = name
        this.level = level
    }

    saveCarreer() {
        const fs = require('fs')
        let data = this.name + " " + this.level
        fs.writeFile('../Save/Carrer.txt', data, (err) => {
            if (err) throw err;
        })
    }
}