"use strict"

const FULL_HEALTH= 100

class BlocoDestrutivel extends ElementoSolto {
    constructor(x, y, width, height, speed, img) {
        super(x, y, width, height, speed, img)
        this.vida= FULL_HEALTH
    }
    
}