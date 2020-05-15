"use strict"

class Inimigo extends BlocoDestrutivel {
    ID_LEFT=0; ID_RIGHT=1; ID_UP=2; ID_DOWN=3
    BULLET_WIDTH=10; BULLET_HEIGHT=13; BULLET_SPEED=4; BULLET_WAITING_TIME=20
    SHOOTING_RANGE=100; FOLLOW_RANGE=150
    BULLET_LOADING_TIME=30; TIME_COUNTER=30
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed)
        this.walking_sprites= [ [], [], [], [] ]
        this.stopped_sprites= new Array()
        this.bullets= new Array()
        this.activated_bullets= new Array()
    }

    //  ONLY ENEMIES USE (AI)
    updateAimFollow(hero1, hero2, ctx) {
		var distanceHero1X = hero1.x - this.x
        var distanceHero1Y = hero1.y - this.y
        var distanceHero2X = hero2.x - this.x
        var distanceHero2Y = hero2.y - this.y
        var distanceHero1= Math.sqrt(Math.pow(distanceHero1X,2)+Math.pow(distanceHero1Y,2))
        var distanceHero2= Math.sqrt(Math.pow(distanceHero2X,2)+Math.pow(distanceHero2Y,2))
        if (distanceHero1<distanceHero2) {
            var aimAngle = Math.atan2(distanceHero1Y,distanceHero1X) / Math.PI * 180
            this.defineDirection(distanceHero1, aimAngle, ctx)
        } else if (distanceHero1>distanceHero2) {
            var aimAngle = Math.atan2(distanceHero2Y,distanceHero2X) / Math.PI * 180
            this.defineDirection(distanceHero2, aimAngle, ctx)
        }
	}
    
    defineDirection(distance, aimAngle, ctx) {
        //  SHOOTING AI
        if (distance<=this.SHOOTING_RANGE) {
            if (this.TIME_COUNTER==this.BULLET_LOADING_TIME) { this.TIME_COUNTER=0; this.defineBullet() }
            else this.TIME_COUNTER++
        } 
        //  ENEMIE FOLLOW HERO
        if (distance<=this.FOLLOW_RANGE) {
            this.keyStatus.walkRight=false; this.keyStatus.walkDown=false; this.keyStatus.walkLeft=false; this.keyStatus.walkUp=false
            if (aimAngle>-25 && aimAngle<25) this.keyStatus.walkRight=true
            else if (aimAngle>=25 && aimAngle<=65) { this.keyStatus.walkRight=true; this.keyStatus.walkDown=true }
            else if (aimAngle>65 && aimAngle<115) this.keyStatus.walkDown=true
            else if (aimAngle>=115 && aimAngle<=155) { this.keyStatus.walkLeft=true; this.keyStatus.walkDown=true }
            else if (aimAngle>=-65 && aimAngle<=-25) { this.keyStatus.walkRight=true; this.keyStatus.walkUp=true }
            else if (aimAngle>-115 && aimAngle<-65) this.keyStatus.walkUp=true
            else if (aimAngle>=-155 && aimAngle<=-115) { this.keyStatus.walkLeft=true; this.keyStatus.walkUp=true }
            else if ((aimAngle>155 && aimAngle<=180) || (aimAngle>=-180 && aimAngle<-155)) { this.keyStatus.walkLeft=true }
            this.moving(ctx.canvas.width, ctx.canvas.height)
        } else {
            if (aimAngle>-25 && aimAngle<25) this.stop("ArrowRight")
            else if (aimAngle>=25 && aimAngle<=65) { this.stop("ArrowRight"); this.stop("ArrowUp") }
            else if (aimAngle>65 && aimAngle<115) this.stop("ArrowUp")
            else if (aimAngle>=115 && aimAngle<=155) { this.stop("ArrowLeft"); this.stop("ArrowUp") }
            else if (aimAngle<=-25 && aimAngle>=-65) { this.stop("ArrowRight"); this.stop("ArrowDown") }
            else if (aimAngle<-65 && aimAngle>-115) this.stop("ArrowDown")
            else if (aimAngle<=-115 && aimAngle>=-155) { this.stop("ArrowLeft"); this.stop("ArrowDown") }
            else if ((aimAngle>155 && aimAngle<=180) || (aimAngle<-155 && aimAngle>=-180)) { this.stop("ArrowLeft"); this.stop("ArrowUp") }
        }
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

    defineBullet() {
        let shooted_bullet
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