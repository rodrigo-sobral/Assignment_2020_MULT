"use strict" 

class ElementoSolto extends ElementoFixo {
    WALKING_SPEED=15
    COUNTER_LEFT= 0
    COUNTER_RIGHT= 0
    COUNTER_UP= 0
    COUNTER_DOWN= 0
    flag_left=false
    flag_right=false
    flag_up=false
    flag_down=false
    constructor(x, y, width, height, speed, img) {
        super(x, y, width, height, img)
        this.keyStatus = {
            walkUp:false, walkDown:false, walkLeft:false, walkRight:false, 
            stopUp:false, stopDown:false, stopLeft:false, stopRight:false,
            firing:false
        }
        this.speed=speed
        this.sound_bullet= this.initSound()
    }
    
    initSound() {
        var audio= new Audio("../resources/sounds/glock_sound.mp3")
        audio.id="sound_bullet"
        return audio
    }

    //  MOVEMENT WITHOUT ANIMATION
    moving(cw, ch) {
        if (this.keyStatus.walkLeft==true) {
            if(this.x>0) this.x-=this.speed
            else this.x=0
        } if (this.keyStatus.walkRight==true) {
            if(this.x+this.width<cw) this.x+=this.speed
            else this.x=cw-this.width
        } if (this.keyStatus.walkUp==true) {
            if(this.y>0) this.y-=this.speed
            else this.y=0
        } if (this.keyStatus.walkDown==true) {
            if(this.y+this.height<ch) this.y+=this.speed
            else this.y=ch-this.height
        }
    }

    isPersonagemOrInimigo() {
        if (Inimigo.prototype.isPrototypeOf(this)==true || Personagem.prototype.isPrototypeOf(this)==true) return true
        else return false
    }

    updateImgData() {
        this.imgData=this.getImageData()
        this.keyStatus.stopLeft=false
        this.keyStatus.stopRight=false
        this.keyStatus.stopUp=false
        this.keyStatus.stopDown=false
    }

}