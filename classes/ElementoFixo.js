"use strict"

class ElementoFixo {
	constructor(x, y, width, height, img) {
		//posição e movimento
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.img = img	
		this.imgData
		if (img!=undefined) this.imgData= this.getImageData()				
	}

	getImageData(){
		var canvas = document.createElement("canvas")
		canvas.width = Math.round(this.width)
		canvas.height = Math.round(this.height)
		var ctx = canvas.getContext("2d")
		var body = document.getElementsByTagName("body")[0]
		body.appendChild(canvas)
		ctx.drawImage(this.img,0,0,Math.round(this.width),this.height)
		body.removeChild(canvas)
		return ctx.getImageData(0, 0, Math.round(this.width), Math.round(this.height))
	}

	draw(ctx) { ctx.drawImage(this.img, this.x, this.y, this.width, this.height) }
	clear(ctx) { ctx.clearRect(this.x, this.y, this.width, this.height) }

	//-------------------------------------------------------------
    //--- Intersections
    //-------------------------------------------------------------
    intersectionWith(sprite) {
		//	xy1 -> canto superior esquerdo
		//	xy2 -> canto inferior direito
		//returns the position of the intersection
		let x1 = sprite.x, y1 = sprite.y
		let x2 = sprite.x+sprite.width, y2 = sprite.y+sprite.height
		
		if (x1>=this.x && x1 <= this.x+this.width) {
			if (y1>=this.y && y1 <= this.y+this.height) return this.checkPixeis(sprite, x1, this.menor(x2, this.x+this.width), y1, this.menor(y2, this.y+this.height))
            else if (y2>=this.y && y2 <= this.y+this.height) return this.checkPixeis(sprite, x1, this.menor(x2, this.x+this.width), this.y, y2)
            else return false
		} else if (x2>=this.x && x2 <= this.x+this.width) {
			if (y1>=this.y && y1 <= this.y+this.height) return this.checkPixeis(sprite, this.x, x2, y1, this.menor(y2, this.y+this.height))
            else if (y2>=this.y && y2 <= this.y + this.height) return this.checkPixeis(sprite, this.x, x2, this.y, y2)
            else return false
        }
        else return false
	}
	menor(a, b) {
		if (a<=b) return a 
		else return b
	}
    checkPixeis(sprite, x1, x2, y1, y2) {
		//	xy1 -> canto superior esquerdo
		//	xy2 -> canto inferior direito
		for(let i = y1 ; i < y2 ; i++){
			for(let j = x1 ; j < x2 ; j++){
				var this_opacity= this.imgData.data[((i-this.y)*Math.round(this.width)+(j-this.x))*4 + 3]
				var sprite_opacity= sprite.imgData.data[((i-sprite.y)*Math.round(sprite.width)+(j-sprite.x))*4 + 3]
				if (this_opacity!=0 && sprite_opacity!=0) return [j, i]
			}
        }
        return false
	}
	
}