"use strict"

class Inimigo extends BlocoDestrutivel {
    ID_LEFT=0; ID_RIGHT=1; ID_UP=2; ID_DOWN=3
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed)
        this.gun=true
        this.walking_sprites= [ [], [], [], [] ]
        this.stopped_sprites= new Array()
        this.bullets= new Array()
        this.activated_bullet
    }

    moving(cw, ch) {
        if (this.keyStatus.walkLeft==true) {
            if (this.keyStatus.walkUp!=true && this.keyStatus.walkDown!=true)  { 
                if (this.COUNTER_LEFT==0) {
                    this.img=this.walking_sprites[0][1]
                    this.flag_left=true
                } else if (this.COUNTER_LEFT==this.WALKING_SPEED){
                    this.img=this.walking_sprites[0][0]
                    this.flag_left=false
                }
                if (this.flag_left==false) this.COUNTER_LEFT--
                else if (this.flag_left==true) this.COUNTER_LEFT++
                this.updateImgData() 
            }
            if(this.x>0) this.x-=this.speed
            else this.x=0
        } if (this.keyStatus.walkRight==true) {
            if (this.keyStatus.walkUp!=true && this.keyStatus.walkDown!=true)  { 
                if (this.COUNTER_RIGHT==0) {
                    this.img=this.walking_sprites[1][1]
                    this.flag_right=true
                } else if (this.COUNTER_RIGHT==this.WALKING_SPEED){
                    this.img=this.walking_sprites[1][0]
                    this.flag_right=false
                }
                if (this.flag_right==false) this.COUNTER_RIGHT--
                else if (this.flag_right==true) this.COUNTER_RIGHT++
                this.updateImgData() 
            }
            if(this.x+this.width<cw) this.x+=this.speed
            else this.x=cw-this.width
        } if (this.keyStatus.walkUp==true) {
            if (this.COUNTER_UP==0) {
                this.img=this.walking_sprites[2][1]
                this.flag_up=true
            } else if (this.COUNTER_UP==this.WALKING_SPEED) {
                this.img=this.walking_sprites[2][0]
                this.flag_up=false
            }
            if (this.flag_up==true) this.COUNTER_UP++
            else if (this.flag_up==false) this.COUNTER_UP--
            this.updateImgData()
            if(this.y>0) this.y-=this.speed
            else this.y=0
        } if (this.keyStatus.walkDown==true) {
            if (this.COUNTER_DOWN==0) {
                this.img=this.walking_sprites[3][1]
                this.flag_down=true
            } else if (this.COUNTER_DOWN==this.WALKING_SPEED) {
                this.img=this.walking_sprites[3][0]
                this.flag_down=false
            } 
            if (this.flag_down==true) this.COUNTER_DOWN++
            else if (this.flag_down==false) this.COUNTER_DOWN--
            this.updateImgData()
            if(this.y+this.height<ch) this.y+=this.speed
            else this.y=ch-this.height
        }
    }

    defineBullet(ctx, hero, blocos) {
        //if (this.arma==true) {
            if (this.keyStatus.walkUp==true && this.keyStatus.walkLeft==true) {
                this.searchDirection("UpLeft")
                this.activated_bullet.x=this.x-this.activated_bullet.width+10
                this.activated_bullet.y=this.y+this.height/2
                this.activated_bullet.keyStatus.walkUp=true
                this.activated_bullet.keyStatus.walkLeft=true
            } else if (this.keyStatus.walkDown==true && this.keyStatus.walkLeft==true) {
                this.searchDirection("DownLeft")
                this.activated_bullet.x=this.x-this.activated_bullet.width+10
                this.activated_bullet.y=this.y+this.height/2
                this.activated_bullet.keyStatus.walkDown=true
                this.activated_bullet.keyStatus.walkLeft=true
            } else if (this.keyStatus.walkUp==true && this.keyStatus.walkRight==true) {
                this.searchDirection("UpRight")
                this.activated_bullet.x=this.x+this.width-10
                this.activated_bullet.y=this.y+this.height/2
                this.activated_bullet.keyStatus.walkUp=true
                this.activated_bullet.keyStatus.walkRight=true
            } else if (this.keyStatus.walkDown==true && this.keyStatus.walkRight==true) {
                this.searchDirection("DownRight")
                this.activated_bullet.x=this.x+this.width-10
                this.activated_bullet.y=this.y+this.height/2
                this.activated_bullet.keyStatus.walkDown=true
                this.activated_bullet.keyStatus.walkRight=true
            } else if (this.keyStatus.walkLeft==true || this.keyStatus.stopLeft==true) {
                this.searchDirection("Left")
                this.activated_bullet.x=this.x-this.activated_bullet.width
                this.activated_bullet.y=this.y+this.height/2
                this.activated_bullet.keyStatus.walkLeft=true
            } else if (this.keyStatus.walkRight==true || this.keyStatus.stopRight==true) {
                this.searchDirection("Right")
                this.activated_bullet.x=this.x+this.width
                this.activated_bullet.y=this.y+this.height/2
                this.activated_bullet.keyStatus.walkRight=true
            } else if (this.keyStatus.walkDown==true || this.keyStatus.stopDown==true){
                this.searchDirection("Down")
                this.activated_bullet.x=this.x+this.width/2
                this.activated_bullet.y=this.y+this.height
                this.activated_bullet.keyStatus.walkDown=true
            } else if (this.keyStatus.walkUp==true || this.keyStatus.stopUp==true) {
                this.searchDirection("Up")
                this.activated_bullet.x=this.x+this.width/2
                this.activated_bullet.y=this.y-this.activated_bullet.height
                this.activated_bullet.keyStatus.walkUp=true
            }
    }   
    searchDirection(direction) {
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].img.id.includes(direction)) { this.activated_bullet=this.bullets[i]; break }
        }
    } 
}