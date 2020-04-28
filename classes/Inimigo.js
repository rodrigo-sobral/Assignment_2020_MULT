"use strict"

class Inimigo extends BlocoDestrutivel {
    ID_LEFT=0; ID_RIGHT=1; ID_UP=2; ID_DOWN=3
    BULLET_WIDTH=10; BULLET_HEIGHT=13; BULLET_SPEED=4
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed)
        this.gun=true
        this.walking_sprites= [ [], [], [], [] ]
        this.stopped_sprites= new Array()
        this.bullets= new Array()
        this.activated_bullets= new Array()
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

    defineBullet() {
        let shooted_bullet
        //if (this.arma==true) {
            if (this.keyStatus.walkUp==true && this.keyStatus.walkLeft==true) {
                shooted_bullet= new ElementoSolto(this.x-this.BULLET_WIDTH+10, this.y+this.height/2, this.BULLET_WIDTH, this.BULLET_HEIGHT, this.BULLET_SPEED, this.searchDirection("UpLeft"))
                shooted_bullet.keyStatus.walkUp=true
                shooted_bullet.keyStatus.walkLeft=true
            } else if (this.keyStatus.walkDown==true && this.keyStatus.walkLeft==true) {
                shooted_bullet= new ElementoSolto(this.x-this.BULLET_WIDTH+10, this.y+this.height/2, this.BULLET_WIDTH, this.BULLET_HEIGHT, this.BULLET_SPEED, this.searchDirection("DownLeft"))
                shooted_bullet.keyStatus.walkDown=true
                shooted_bullet.keyStatus.walkLeft=true
            } else if (this.keyStatus.walkUp==true && this.keyStatus.walkRight==true) {
                shooted_bullet= new ElementoSolto(this.x+this.width-10, this.y+this.height/2, this.BULLET_WIDTH, this.BULLET_HEIGHT, this.BULLET_SPEED, this.searchDirection("UpRight"))
                shooted_bullet.keyStatus.walkUp=true
                shooted_bullet.keyStatus.walkRight=true
            } else if (this.keyStatus.walkDown==true && this.keyStatus.walkRight==true) {
                shooted_bullet= new ElementoSolto(this.x+this.width-10, this.y+this.height/2, this.BULLET_WIDTH, this.BULLET_HEIGHT, this.BULLET_SPEED, this.searchDirection("DownRight"))
                shooted_bullet.keyStatus.walkDown=true
                shooted_bullet.keyStatus.walkRight=true
            } else if (this.keyStatus.walkLeft==true || this.keyStatus.stopLeft==true) {
                shooted_bullet= new ElementoSolto(this.x-this.BULLET_WIDTH, this.y+this.height/2, this.BULLET_WIDTH, this.BULLET_HEIGHT, this.BULLET_SPEED, this.searchDirection("Left"))              
                shooted_bullet.keyStatus.walkLeft=true
            } else if (this.keyStatus.walkRight==true || this.keyStatus.stopRight==true) {
                shooted_bullet= new ElementoSolto(this.x+this.width, this.y+this.height/2, this.BULLET_WIDTH, this.BULLET_HEIGHT, this.BULLET_SPEED, this.searchDirection("Right"))
                shooted_bullet.keyStatus.walkRight=true
            } else if (this.keyStatus.walkDown==true || this.keyStatus.stopDown==true){
                shooted_bullet= new ElementoSolto(this.x+this.width/2, this.y+this.height/2, this.BULLET_WIDTH, this.BULLET_HEIGHT, this.BULLET_SPEED, this.searchDirection("Down"))
                shooted_bullet.keyStatus.walkDown=true
            } else if (this.keyStatus.walkUp==true || this.keyStatus.stopUp==true) {
                shooted_bullet= new ElementoSolto(this.x+this.width/2, this.y-this.BULLET_HEIGHT, this.BULLET_WIDTH, this.BULLET_HEIGHT, this.BULLET_SPEED, this.searchDirection("Up"))
                shooted_bullet.keyStatus.walkUp=true
            }
            for (let i = 0; i < this.activated_bullets.length; i++) {
                if (this.activated_bullets[i].x==shooted_bullet.x && this.activated_bullets[i].y==shooted_bullet.y) return
            }
            this.activated_bullets.push(shooted_bullet)
            this.keyStatus.firing=true
            shooted_bullet.sound_bullet.play()
    }   
    searchDirection(direction) {
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].id.includes(direction)) { return this.bullets[i] }
        }
    } 
}