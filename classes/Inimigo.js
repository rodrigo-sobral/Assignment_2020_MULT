"use strict"

class Inimigo extends BlocoDestrutivel {
    SPRITE_IMGS= 4; SPRITE_BULLETS=8
    ID_LEFT=0; ID_RIGHT=1; ID_UP=2; ID_DOWN=3
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed)
        this.gun=true
        this.walking_sprites= new Array()
        this.stopped_sprites= new Array()
        this.bullets= new Array()
    }

    shoot(ctx, hero, blocos) {
        var bullet
        //if (this.arma==true) {
            if (this.keyStatus.walkUp==true && this.keyStatus.walkLeft==true) {
                bullet=this.searchDirection("UpLeft")
                bullet.x=this.x-bullet.width+10
                bullet.y=this.y+this.height/2
                bullet.keyStatus.walkUp=true
                bullet.keyStatus.walkLeft=true
            } else if (this.keyStatus.walkDown==true && this.keyStatus.walkLeft==true) {
                bullet=this.searchDirection("DownLeft")
                bullet.x=this.x-bullet.width+10
                bullet.y=this.y+this.height/2
                bullet.keyStatus.walkDown=true
                bullet.keyStatus.walkLeft=true
            } else if (this.keyStatus.walkUp==true && this.keyStatus.walkRight==true) {
                bullet=this.searchDirection("UpRight")
                bullet.x=this.x+this.width-10
                bullet.y=this.y+this.height/2
                bullet.keyStatus.walkUp=true
                bullet.keyStatus.walkRight=true
            } else if (this.keyStatus.walkDown==true && this.keyStatus.walkRight==true) {
                bullet=this.searchDirection("DownRight")
                bullet.x=this.x+this.width-10
                bullet.y=this.y+this.height/2
                bullet.keyStatus.walkDown=true
                bullet.keyStatus.walkRight=true
            } else if (this.keyStatus.walkLeft==true || this.keyStatus.stopLeft==true) {
                bullet=this.searchDirection("Left")
                bullet.x=this.x-bullet.width
                bullet.y=this.y+this.height/2
                bullet.keyStatus.walkLeft=true
            } else if (this.keyStatus.walkRight==true || this.keyStatus.stopRight==true) {
                bullet=this.searchDirection("Right")
                bullet.x=this.x+this.width
                bullet.y=this.y+this.height/2
                bullet.keyStatus.walkRight=true
            } else if (this.keyStatus.walkDown==true || this.keyStatus.stopDown==true){
                bullet=this.searchDirection("Down")
                bullet.x=this.x+this.width/2
                bullet.y=this.y+this.height
                bullet.keyStatus.walkDown=true
            } else if (this.keyStatus.walkUp==true || this.keyStatus.stopUp==true) {
                bullet=this.searchDirection("Up")
                bullet.x=this.x+this.width/2
                bullet.y=this.y-bullet.height
                bullet.keyStatus.walkUp=true
            }

            while ((bullet.intersectionWith(hero)==false && bullet.intersectionWith(blocos)==false) && (bullet.x>0 && bullet.x<ctx.canvas.width-bullet.width && bullet.y>0 && bullet.y<ctx.canvas.height-bullet.height)) {
                bullet.draw(ctx)
                bullet.clear(ctx)
                bullet.moving(ctx.canvas.width, ctx.canvas.height)
            }
            console.log("bateu")
    }   
    searchDirection(direction) {
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].img.id.includes(direction)) return this.bullets[i]
        }
        return false
    } 
}