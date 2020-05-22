"use strict"

class Nivel {
    constructor(id, chapter, backgroundPath, canvas, ctx) {
        this.id=id
        this.chapter=chapter
        this.backgroundLevel= new Image()
        
        this.fixedBlocksMatrix= this.initMatrix()
        //this.hardBlockArray = new Array(this.fixedBlocksMatrix.length)

        this.loadLevel(backgroundPath, ctx)
        canvas.addEventListener("blocksEnd", initEndHandler)

        function initEndHandler(ev) {
            console.log(ev)
            //var auxHardBlockArray= ev.auxHardBlockArray
        }
    }

    blockCounter() {
        let tot_sprites=0
        for(let i=0; i<this.fixedBlocksMatrix.length; i++){
            for(let j=0; j<this.fixedBlocksMatrix[i].length; j++){
                if(this.fixedBlocksMatrix[i][j]!=0) tot_sprites++ 
            }
        }
        return tot_sprites
    }

    //  ==initAllComponens()
    loadLevel(backgroundPath, ctx) {
        this.backgroundLevel.id="bg"
        this.backgroundLevel.src= backgroundPath

        var nLoad = 0
        var auxHardBlockArray= new Array(this.fixedBlocksMatrix.length)
        var tot_sprites= this.blockCounter()
        
        for(let i=0;i<this.fixedBlocksMatrix.length;i++){
            //this.hardBlockArray[i]=new Array(this.fixedBlocksMatrix[i].length).fill(0)
            auxHardBlockArray[i]= new Array(this.fixedBlocksMatrix[i].length).fill(0)
            for(let j=0;j<this.fixedBlocksMatrix[i].length;j++){
                if(this.fixedBlocksMatrix[i][j]!=0){
                    var aux= new Image()
                    aux.id= "bloco"
                    aux.src="../../resources/images/maps/sprites/uniqueTiles/tile_"+this.chapter+this.fixedBlocksMatrix[i][j]+".png"
                    aux.addEventListener("load", loadBlock(aux, i, j))
                }
            }
        }
        function loadBlock(aux, i, j) {
            var img = aux
            var hardBlock= new ElementoFixo(32*i, 32*j, 32, 32, img)
            auxHardBlockArray[i][j]=hardBlock
            nLoad++	

            if (nLoad == tot_sprites) {
                var ev2 = new Event("blocksEnd")
                ev2.auxHardBlockArray= auxHardBlockArray
                console.log(ev2)
                ctx.canvas.dispatchEvent(ev2)
            }
        }
    }

    initMatrix() {
        if (this.id==1 && this.chapter=="training_camp") {
            return [ [8, 23, 17, 0, 0, 0, 0, 0, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 17, 17, 0, 17, 0, 17, 7],
            [13, 0, 0, 15, 0, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 21, 0, 3],
            [13, 0, 0, 15, 20, 0, 0, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 21, 21, 21, 0, 0, 0, 0, 0, 0,18, 0, 0, 0, 0, 0, 0, 3],
            [13, 0, 15, 15, 0, 0, 0, 0, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 21, 0, 0, 0, 20, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 3],
            [13, 0, 15, 15, 0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0, 0, 21, 21, 19, 21, 0, 0, 0, 0, 20, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 3],
            [13, 0, 0, 15, 15, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [13, 0, 0, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0 , 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 14, 14, 14, 14, 14, 14, 14, 0, 3],
            [13, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 25, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 3],
            [13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 3],
            [13, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 14, 14, 14, 14, 0, 0, 14, 0, 3],
            [13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 3],
            [13, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 19, 0, 0, 0, 0, 0, 0, 0, 15, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 3],
            [13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 0, 15, 0, 0, 0, 14, 14, 14, 14, 14, 14,14, 14, 14, 14, 0, 3],
            [9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3]]
        }
    }
}