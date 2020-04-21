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
            this.img=this.walking_sprites[this.ID_LEFT]
            this.imgData=this.getImageData()
            if(this.x>0) this.x-=this.speed
            else this.x=0
        } if (this.keyStatus.walkRight==true) {
            this.img=this.walking_sprites[this.ID_RIGHT]
            this.imgData=this.getImageData()
            if(this.x+this.width<cw) this.x+=this.speed
            else this.x=cw-this.width
        } if (this.keyStatus.walkUp==true) {
            this.img=this.walking_sprites[this.ID_UP]
            this.imgData=this.getImageData()
            if(this.y>0) this.y-=this.speed
            else this.y=0
        } if (this.keyStatus.walkDown==true) {
            this.img=this.walking_sprites[this.ID_DOWN]
            this.imgData=this.getImageData()
            if(this.y+this.height<ch) this.y+=this.speed
            else this.y=ch-this.height
        }
    }
}