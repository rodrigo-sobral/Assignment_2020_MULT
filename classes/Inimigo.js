"use strict"

class Inimigo extends BlocoDestrutivel{
    constructor(posx, posy, width, height, img, arma) {
        super(posx, posy, width, height, img)
        this.arma=arma
    }
}