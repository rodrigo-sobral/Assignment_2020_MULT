"use strict"

const FULL_HEALTH= 100

class BlocoDestrutivel extends ElementoSolto {
    constructor(posx, posy, width, height, img) {
        super(posx, posy, width, height, img)
        this.vida= FULL_HEALTH
    }
    
}