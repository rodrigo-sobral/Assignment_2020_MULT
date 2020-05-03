"use strict"

class Personagem extends Inimigo {
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed)
        this.arma=false
    }

    //-------------------------------------------------------------
    //--- Yin & Sasha Movement
    //-------------------------------------------------------------
    /**
     * @param {String} code 
     */
    detect_movement(code) {
        if (this.keyStatus.walkUp==false && (code=="ArrowUp" || code=="KeyW")) {
            this.keyStatus.walkUp=true
        } else if (this.keyStatus.walkDown==false && (code=="ArrowDown" || code=="KeyS")) {
            this.keyStatus.walkDown=true
        } else if (this.keyStatus.walkLeft==false && (code=="ArrowLeft" || code=="KeyA")) {
            this.keyStatus.walkLeft=true
        } else if (this.keyStatus.walkRight==false && (code=="ArrowRight" || code=="KeyD")) {
            this.keyStatus.walkRight=true
        }
    }
    
    detectIntersection(sprite) {
        var contactPoint= this.intersectionWith(sprite)
        if (contactPoint[0]<sprite.x+sprite.width/2) this.stop("ArrowRight")
        else if (contactPoint[0]>sprite.x+sprite.width/2) this.stop("ArrowLeft")
        if (contactPoint[1]<sprite.y+sprite.height/2) this.stop("ArrowDown")
        else if (contactPoint[1]>sprite.y+sprite.height/2) this.stop("ArrowUp")
    }

}