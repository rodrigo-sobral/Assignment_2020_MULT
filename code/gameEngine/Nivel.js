"use strict"

class Nivel {
    constructor(id, chapter, backgroundPath, canvas, ctx) {
        this.id=id
        this.chapter=chapter
        this.backgroundLevel= new Image()
        this.backgroundLevel.src= backgroundPath
        if (id==1) this.tot_enemies=5
        else if (id==2) this.tot_enemies=5
        this.fixedBlocksMatrix= this.initMatrix()
        this.tot_blocks= this.blockCounter()
        this.allEnemies=new Array()

        var hardBlockArray, agentEnemie
        canvas.addEventListener("blocksEnd", blockInitEnd)
        this.loadLevel(ctx)
        function blockInitEnd(ev) { 
            hardBlockArray= ev.hardBlockArray
            agentEnemie=ev.agentEnemie
        }
        this.hardBlockArray=hardBlockArray
        this.fullEnemies(agentEnemie) 
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
        } else if (this.id==2 && this.chapter=="training_camp") {
            return [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 25, 26, 26, 26, 26, 26, 26, 26, 26,26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,26, 19, 19, 19, 0],
            [0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0],
            [0, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0],
            [0, 28, 0, 0, 0, 19, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 19, 19, 19, 0],
            [0, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0],
            [0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0],
            [0, 0, 0, 26, 26,26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 0, 0, 0, 0,28 , 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 28, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 28, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 0, 28, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 0, 28, 0, 0],
            [26, 26, 26, 26,26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 0, 0, 0, 0, 25, 0, 0, 0],
            [13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0],
            [13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0],
            [26, 26, 26,26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
        } else if (this.id==3 && this.chapter=="training_camp") {
            return [ [0, 0, 0, 8, 17, 0, 17, 17, 17, 7, 0, 0, 0, 0, 8, 17, 17, 0, 17, 17, 17,7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],
            [0, 0, 0, 13, 0, 20, 0, 0, 0, 11, 0, 0, 0, 0, 13, 0, 0, 20, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 21, 0, 0, 0],
            [0, 0, 0, 13, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0,21, 0, 0],
            [0, 0, 0, 13, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 21, 0, 0, 0, 0, 21, 0],
            [0, 0, 0, 13, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 21, 0,20, 20, 0, 21, 0],
            [0, 0, 0, 0, 13, 0, 0, 0, 0,16 , 17, 17, 17, 17, 18, 0, 0, 0, 0, 20, 0, 11, 0, 0, 25, 4, 4, 4, 27, 0, 0, 0, 21, 0, 0, 0, 0, 21, 0],
            [0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,11, 0, 13, 0, 0, 0, 0, 0, 11, 0, 0, 21, 0, 0,0,0, 21, 0],
            [0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 13, 0, 0, 20, 0, 0, 11, 0, 0, 21, 0, 0,0,0, 21, 0],
            [8, 17, 17, 17, 17, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 18, 0, 0, 0, 0, 0, 16, 17, 18, 21, 0, 0,0,0, 21, 0],
            [13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
            [13, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
            [13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11],
            [13, 26, 26, 26, 26, 26, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 15],
            [13, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 11],
            [13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 11],
            [13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15, 0, 0, 20, 0, 11],
            [9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,4, 4, 4, 4,4, 4, 4, 10]]
        }
    }

    loadLevel(ctx) {
        var ids=["Left", "Right", "Up", "Down"]
        var nLoad = 0
        var tot_sprites= 12+this.tot_blocks
        var hardBlockArray= new Array(this.fixedBlocksMatrix.length)
        var agentEnemie= new Inimigo(400, 50, CHARACTER_SIZE, CHARACTER_SIZE, 1)
        var enemieSprite, auxEnemieSprite
        
        for(let i=0;i<this.fixedBlocksMatrix.length;i++){
            hardBlockArray[i]= new Array(this.fixedBlocksMatrix[i].length).fill(0)
            for(let j=0;j<this.fixedBlocksMatrix[i].length;j++){
                if(this.fixedBlocksMatrix[i][j]!=0){
                    var aux= new Image()
                    aux.id= "bloco"
                    aux.src="../../resources/images/maps/sprites/uniqueTiles/tile_"+this.chapter+this.fixedBlocksMatrix[i][j]+".png"
                    aux.addEventListener("load", loadBlockEnemie(aux, i, j))
                }
            }
        }

        //	STOPPED AGENT
        for (let i=0; i<4; i++) {
            enemieSprite= new Image()
            enemieSprite.id= "enemie"+ids[i]
            enemieSprite.src= "../resources/images/enemies/agent_"+ids[i]+"1.png"
            enemieSprite.addEventListener("load", loadBlockEnemie(enemieSprite))
        }

        //	MOVING AGENT
        for (let i=0; i<4; i++) {
            enemieSprite= new Image()
            auxEnemieSprite= new Image()
            enemieSprite.id= "enemie"+ids[i]+"2"
            auxEnemieSprite.id="enemie"+ids[i]+"3"
            enemieSprite.src= "../resources/images/enemies/agent_"+ids[i]+"2.png"
            auxEnemieSprite.src="../resources/images/enemies/agent_"+ids[i]+"3.png"
            enemieSprite.addEventListener("load", loadBlockEnemie(enemieSprite))
            auxEnemieSprite.addEventListener("load", loadBlockEnemie(auxEnemieSprite))
        }

        function loadBlockEnemie(img, i, j) {
            if (img.id.includes("enemie")==true) {
                if (img.src.includes("1.png")) {
                    if (img.id.includes(ids[0]))agentEnemie.stopped_sprites[0]=img
                    else if (img.id.includes(ids[1]))agentEnemie.stopped_sprites[1]=img
                    else if (img.id.includes(ids[2]))agentEnemie.stopped_sprites[2]=img
                    else if (img.id.includes(ids[3]))agentEnemie.stopped_sprites[3]=img
                } else {
                    if (img.id.includes(ids[0]))agentEnemie.walking_sprites[0].push(img)
                    else if (img.id.includes(ids[1]))agentEnemie.walking_sprites[1].push(img)
                    else if (img.id.includes(ids[2]))agentEnemie.walking_sprites[2].push(img)
                    else if (img.id.includes(ids[3]))agentEnemie.walking_sprites[3].push(img)
                }
            } else {
                var hardBlock= new ElementoFixo(BLOCK_SIZE*j, BLOCK_SIZE*i, BLOCK_SIZE, BLOCK_SIZE, img)
                hardBlockArray[i][j]=hardBlock
            }
            nLoad++	
    
            if (nLoad == tot_sprites) {
                var ev2 = new Event("blocksEnd")
                ev2.hardBlockArray= hardBlockArray
                ev2.agentEnemie= agentEnemie
                ctx.canvas.dispatchEvent(ev2)
            }
        }
    }

    fullEnemies(agentEnemie) {
        for (let i = 0; i < this.tot_enemies; i++) {
			this.allEnemies.push(new Inimigo(400, 50, CHARACTER_SIZE, CHARACTER_SIZE, 1))
			this.allEnemies[i].stopped_sprites= agentEnemie.stopped_sprites
			this.allEnemies[i].walking_sprites= agentEnemie.walking_sprites
			this.allEnemies[i].img=this.allEnemies[i].stopped_sprites[3]
			this.allEnemies[i].imgData=this.allEnemies[i].getImageData()
        }
        if (this.id==1) {
            this.allEnemies[1].x= 130, this.allEnemies[1].y= 100
            this.allEnemies[2].x= 1120, this.allEnemies[2].y= 70
            this.allEnemies[3].x= 750, this.allEnemies[3].y= 400
            this.allEnemies[4].x= 700, this.allEnemies[4].y= 100
        } else if (this.id==2) {
            this.allEnemies[1].x= 400, this.allEnemies[1].y= 800
            this.allEnemies[2].x= 1120, this.allEnemies[2].y= 70
            this.allEnemies[3].x= 750, this.allEnemies[3].y= 400
            this.allEnemies[4].x= 700, this.allEnemies[4].y= 100
        }
    }
}