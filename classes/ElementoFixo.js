"use strict"

class ElementoFixo {
	constructor(x, y, width, height, img) {
		//posição e movimento
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.img = img		
		this.imgData = this.getimagedata()				
	}

	getimagedata(){
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
}