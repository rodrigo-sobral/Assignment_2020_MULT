"use strict"

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Inimigo extends BlocoDestrutivel {
    SPRITE_IMGS= 4; SPRITE_BULLETS=8
    ID_LEFT=0; ID_RIGHT=1; ID_UP=2; ID_DOWN=3
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed)
        this.arma=true
        this.walking_sprites= new Array()
        this.stopped_sprites= new Array()
        this.bullets= new Array()
    }

    shoot(ctx, hero, blocos) {
        //if (this.arma==true) {
            if (this.keyStatus.walkLeft==true || this.keyStatus.stopLeft==true) {
                this.bullets.x=this.x-this.bullets.width
                this.bullets.y=this.y+this.height/2
                this.bullets.keyStatus.walkLeft=true
            } if (this.keyStatus.walkRight==true || this.keyStatus.stopRight==true) {
                this.bullets.x=this.x+this.width
                this.bullets.y=this.y+this.height/2
                this.bullets.keyStatus.walkRight=true
            } if (this.keyStatus.walkDown==true || this.keyStatus.stopDown==true){
                this.bullets.x=this.x+this.width/2
                this.bullets.y=this.y+this.height
                this.bullets.keyStatus.walkDown=true
            } if (this.keyStatus.walkUp==true || this.keyStatus.stopUp==true) {
                this.bullets.x=this.x+this.width/2
                this.bullets.y=this.y-this.bullets.height
                this.bullets.keyStatus.walkUp=true
            }
            //if (direction!=[0, 0]) {
                while ((this.bullets.intersectionWith(hero)==false && this.bullets.intersectionWith(blocos)==false) && (this.bullets.x>0 && this.bullets.x<ctx.canvas.width-this.bullets.width && this.bullets.y>0 && this.bullets.y<ctx.canvas.height-this.bullets.height)) {
                    this.bullets.draw(ctx)
                    this.bullets.moving(ctx)
                    sleep(2000)
                }
                this.bullets.clear(ctx)
                console.log("bateu")
            //}

        //}
    }
    
}