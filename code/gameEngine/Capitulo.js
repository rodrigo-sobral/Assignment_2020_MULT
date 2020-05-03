"use strict"

const N_LEVELS=5

class Capitulo{
    constructor(name, id) {
        this.id=id
        this.name=name
        this.levels= [new Nivel(0, this.id), new Nivel(1, this.id), new Nivel(2, this.id), new Nivel(3, this.id), new Nivel(4, this.id)]
    }
}