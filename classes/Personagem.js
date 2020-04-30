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
    /**
     * @param {String} code 
     */
    stop(code) {
        if (this.keyStatus.walkUp==true && (code=="ArrowUp" || code=="KeyW")) {
            this.img=this.stopped_sprites[this.ID_UP]
            this.imgData=this.getImageData()
            this.keyStatus.walkUp=false
            this.keyStatus.stopUp=true
        } else if (this.keyStatus.walkDown==true && (code=="ArrowDown" || code=="KeyS")) {
            this.img=this.stopped_sprites[this.ID_DOWN]
            this.imgData=this.getImageData()
            this.keyStatus.walkDown=false
            this.keyStatus.stopDown=true
        } else if (this.keyStatus.walkLeft==true && (code=="ArrowLeft" || code=="KeyA")) {
            this.img=this.stopped_sprites[this.ID_LEFT]
            this.imgData=this.getImageData()
            this.keyStatus.walkLeft=false
            this.keyStatus.stopLeft=true
        } else if (this.keyStatus.walkRight==true && (code=="ArrowRight" || code=="KeyD")) {
            this.img=this.stopped_sprites[this.ID_RIGHT]
            this.imgData=this.getImageData()
            this.keyStatus.walkRight=false
            this.keyStatus.stopRight=true
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