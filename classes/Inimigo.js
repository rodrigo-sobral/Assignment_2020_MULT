"use strict"

class Inimigo extends BlocoDestrutivel{
    constructor(x, y, width, height, speed, img, arma) {
        super(x, y, width, height, speed, img)
        this.arma=arma
    }
}