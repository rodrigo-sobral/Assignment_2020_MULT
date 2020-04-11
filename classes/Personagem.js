"use strict"

class Personagem extends Inimigo {
    constructor(x, y, width, height, speed, img, arma) {
        super(x, y, width, height, speed, img, arma)
        this.right=false
        this.left=false
        this.up=false
        this.down=false
    }

    detect_movement(code, cw, ch) {
        if (code=="ArrowUp" || code=="KeyW") this.up=true
        else if (code=="ArrowDown" || code=="KeyS") this.down=true
        else if (code=="ArrowLeft" || code=="KeyA") this.left=true
        else if (code=="ArrowRight" || code=="KeyD") this.right=true
    }

    stop(code) {
        if (code=="ArrowUp" || code=="KeyW") {
            if (this.img.id=="yin") this.img.src="../resources/yin_sprite_back.png"
            else this.img.src="../resources/Sasha_sprite_back.png"
            this.up=false
        } else if (code=="ArrowDown" || code=="KeyS") {
            if (this.img.id=="yin") this.img.src="../resources/yin_sprite.png"
            else this.img.src="../resources/Sasha_sprite.png"
            this.down=false
        } else if (code=="ArrowLeft" || code=="KeyA") {
            if (this.img.id=="yin") this.img.src="../resources/yin_sprite_left.png"
            else this.img.src="../resources/Sasha_sprite_left.png"
            this.left=false
        } else if (code=="ArrowRight" || code=="KeyD") {
            if (this.img.id=="yin") this.img.src="../resources/yin_sprite_right.png"
            else this.img.src="../resources/Sasha_sprite_right.png"
            this.right=false
        }
    }
    
    walking(cw, ch) {
        if (this.left==true) {
            if (this.img.id=="yin") this.img.src="../resources/yin_sprite_left.gif"
            else this.img.src="../resources/Sasha_sprite_left.gif"
            if(this.x>0) this.x-=this.speed
            else this.x=0
        } if (this.right==true) {
            if (this.img.id=="yin") this.img.src="../resources/yin_sprite_right.gif"
            else this.img.src="../resources/Sasha_sprite_right.gif"
            if(this.x+this.width<cw) this.x+=this.speed
            else this.x=cw-this.width
        } if (this.up==true) {
            if (this.img.id=="yin") this.img.src="../resources/yin_sprite_back.gif"
            else this.img.src="../resources/Sasha_sprite_back.gif"
            if(this.y>0) this.y-=this.speed
            else this.y=0
        } if (this.down==true) {
            if (this.img.id=="yin") this.img.src="../resources/yin_sprite.gif"
            else this.img.src="../resources/Sasha_sprite.gif"
            if(this.y+this.height<ch) this.y+=this.speed
            else this.y=ch-this.height
        }
    }
}