"use strict"

class Personagem extends Inimigo {
    constructor(posx, posy, width, height, img, arma) {
        super(posx, posy, width, height, img, arma)
        this.left=false
		this.right=false
		this.up=false
		this.down=false
    }

    
}