"use strict";

(function() {
	window.addEventListener("load", main);
}());

function main() {
	var canvas = document.getElementById("canvas")
	var ctx = canvas.getContext("2d")
	var spArray

	canvas.addEventListener("initend", initEndHandler);
	init(ctx)

	function initEndHandler(ev) {
		spArray = ev.spArray
		startAnim(ctx, spArray)
	}
}

function init(ctx) {
	var nLoad = 0;
	var totLoad = 1;
	var spArray = new Array(totLoad);

	var boneco = new Image()
	boneco.id="boneco"
	boneco.src = "../resources/yin_sprite.png";  //dá ordem de carregamento da imagem
	boneco.addEventListener("load", imgLoadedHandler)
	
	function imgLoadedHandler(ev) {
		var img = ev.target;
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;
		spArray[0]= new Personagem(50, 50, nw, nh, boneco, 0)
		nLoad++;		
		if (nLoad == totLoad) {
			var ev2 = new Event("initend");
			ev2.spArray = spArray;
			ctx.canvas.dispatchEvent(ev2);
		}
	}
}

//iniciar animação
function startAnim(ctx, spArray) {
	draw(ctx, spArray)
}

function draw(ctx, spArray) {
	var dim = spArray.length;
	for (let i = 0; i < dim; i++) spArray[i].draw(ctx);
}