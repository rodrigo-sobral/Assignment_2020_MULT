"use strict" 

class ElementoSolto extends ElementoFixo {
    constructor(x, y, width, height, speed, img) {
        super(x, y, width, height, img)
        this.keyStatus = {
            walkUp:false, walkDown:false, walkLeft:false, walkRight:false, 
            stopUp:false, stopDown:false, stopLeft:false, stopRight:false,
            firing:false
        }
        this.speed=speed
    }

    moving(cw, ch) {
        if (this.keyStatus.walkLeft==true) {
            if (this.isPersonagemOrInimigo()==true)  { this.img=this.walking_sprites[this.ID_LEFT]; this.updateImg() }
            
            if(this.x>0) this.x-=this.speed
            else this.x=0
        } if (this.keyStatus.walkRight==true) {
            if (this.isPersonagemOrInimigo()==true)  { this.img=this.walking_sprites[this.ID_RIGHT]; this.updateImg() }
            
            if(this.x+this.width<cw) this.x+=this.speed
            else this.x=cw-this.width
        } if (this.keyStatus.walkUp==true) {
            if (this.isPersonagemOrInimigo()==true)  { this.img=this.walking_sprites[this.ID_UP]; this.updateImg() }
            
            if(this.y>0) this.y-=this.speed
            else this.y=0
        } if (this.keyStatus.walkDown==true) {
            if (this.isPersonagemOrInimigo()==true)  { this.img=this.walking_sprites[this.ID_DOWN]; this.updateImg() }
            
            if(this.y+this.height<ch) this.y+=this.speed
            else this.y=ch-this.height
        }
    }

    isPersonagemOrInimigo() {
        if (Inimigo.prototype.isPrototypeOf(this)==true || Personagem.prototype.isPrototypeOf(this)==true) return true
        else return false
    }
    updateImg() {
        this.imgData=this.getImageData()
        this.resetStop()
    }

    resetStop() {
        this.keyStatus.stopLeft=false
        this.keyStatus.stopRight=false
        this.keyStatus.stopUp=false
        this.keyStatus.stopDown=false
    }
}