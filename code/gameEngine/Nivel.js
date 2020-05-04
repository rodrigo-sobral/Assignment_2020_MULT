"use strict"

class Nivel {
    constructor(id, chapter, backgroundPath, fixedBlocksMatrix) {
        this.id=id
        this.chapter=chapter
        this.backgroundPath=backgroundPath
        this.fixedBlocksMatrix=fixedBlocksMatrix
        if (this.id==0 && this.chapter==0) this.locked= false
        else this.locked= true
    }

    loadLevel(ctx, cw, ch){
        var bg= new Image()
        var hardBlock
        var hardBlockArray = new Array(this.fixedBlocksMatrix.length())
        bg.id="bg"
        bg.src=this.backgroundPath
        ctx.drawImage(bg, 0, 0, cw, ch)
        for(let i=0;i<this.fixedBlocksMatrix.length();i++){
            hardBlockArray[i]=new Array(this.fixedBlocksMatrix[j].length()).fill(0)
            for(let j=0;j<this.fixedBlocksMatrix[j].length();j++){
                if(this.fixedBlocksMatrix[i][j]!=0){
                    hardBlock=new ElementoFixo(32*i,32*j,32,32,"../../resources/images/maps/sprites/uniqueTiles/tile_"+this.chapter+this.fixedBlocksMatrix[i][j]+".png")
                    hardBlock.draw(ctx)
                    hardBlockArray[i][j]=hardBlock
                }
            }
        }
        return hardBlockArray
    }

}