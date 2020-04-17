"use strict";

(function() {
	window.addEventListener("load", main);
}());

const TOT_HEROES=2
const ID_YIN=1
const ID_SASHA=0
const BLOCK_SIZE=40

function main() {
	var canvas = document.getElementById("canvas")
	var ctx = canvas.getContext("2d")
	var heroes
	var blocos

	initAllComponents(ctx)
	canvas.addEventListener("initend", initEndHandler)

	function initEndHandler(ev) {
		heroes= ev.heroes
		blocos= ev.blocos
		drawSprites(ctx, blocos)
		drawSprites(ctx, heroes)
		animLoop(ctx, heroes, blocos)
	}

}

function initAllComponents(ctx) {
	var nLoad = 0
	var totLoad = TOT_HEROES 
	var heroes = new Array(totLoad)
	var blocos = new Array(1)

	var yin = new Image()
	var sasha= new Image()
	yin.id="yin"
	sasha.id="sasha"
	yin.src = "../resources/yin_sprite_front1.png"
	sasha.src = "../resources/Sasha_sprite_front1.png"
	yin.addEventListener("load", imgLoadedHandler)
	sasha.addEventListener("load", imgLoadedHandler)

	var bloco= new Image()
	bloco.id="bloco"
	bloco.src="../resources/Game_slot_format.png"
	bloco.addEventListener("load", imgLoadedHandler)
	
	function imgLoadedHandler(ev) {
		var img = ev.target
		if (img.id=="yin")  heroes[ID_YIN]= new Personagem(50, 50, BLOCK_SIZE, BLOCK_SIZE, 2, img)
		else if (img.id=="sasha")  heroes[ID_SASHA] = new Personagem(100, 100, BLOCK_SIZE, BLOCK_SIZE, 2, img)
		else blocos[0]= new ElementoFixo(100, 50, BLOCK_SIZE, BLOCK_SIZE, img)
		nLoad++	
		if (nLoad == totLoad+1) {
			var ev2 = new Event("initend");
			ev2.heroes= heroes
			ev2.blocos= blocos
			ctx.canvas.dispatchEvent(ev2);
		}
	}
}

function drawSprites(ctx, sprites) {
	for (let i=0; i < sprites.length; i++) sprites[i].draw(ctx);
}

function animLoop(ctx, heroes, blocos) {
	var al = function() { animLoop(ctx, heroes, blocos) }
	window.requestAnimationFrame(al)
	
	render(ctx, heroes, blocos)
}

//resedenho, actualizações, ...
function render(ctx, heroes, blocos) {
	let ch= ctx.canvas.height
	let cw= ctx.canvas.width

	detectKeyboard(heroes, cw, ch)

	heroes[ID_SASHA].detectIntersection(heroes[ID_YIN])
	heroes[ID_YIN].detectIntersection(heroes[ID_SASHA])
	heroes[ID_SASHA].detectIntersection(blocos[0])
	heroes[ID_YIN].detectIntersection(blocos[0])

	heroes[ID_SASHA].walking(cw, ch)
	heroes[ID_YIN].walking(cw, ch)
	

	ctx.clearRect(0, 0, cw, ch)
	drawSprites(ctx, heroes)
	drawSprites(ctx, blocos)
}

function detectKeyboard(heroes, cw, ch) {
	function keyHandler(ev) { keyUpDownHandler(ev, heroes) }

	//	keyboard
	window.addEventListener("keydown", keyHandler)
	window.addEventListener("keyup", keyHandler)

}

/**
 * @param {Event} ev 
 * @param {Personagem} heroes
 */
function keyUpDownHandler(ev, heroes) {
	if (ev.type=="keydown") {
		if (ev.code=="Escape") console.log(ev.code) // menu pause
		// MOVE YIN
		else if (ev.code=="ArrowUp" || ev.code=="ArrowDown" || ev.code=="ArrowRight" || ev.code=="ArrowLeft") 
			heroes[ID_YIN].detect_movement(ev.code)
		// MOVE SASHA
		else if (ev.code=="KeyW" || ev.code=="KeyS" || ev.code=="KeyA" || ev.code=="KeyD") 
			heroes[ID_SASHA].detect_movement(ev.code)
	} else if (ev.type=="keyup") {
		// PARA YIN
		if (ev.code=="ArrowUp" || ev.code=="ArrowDown" || ev.code=="ArrowRight" || ev.code=="ArrowLeft") 
			heroes[ID_YIN].stop(ev.code)
		// PARA SASHA
		else if (ev.code=="KeyW" || ev.code=="KeyS" || ev.code=="KeyA" || ev.code=="KeyD") 
			heroes[ID_SASHA].stop(ev.code)
	}
}

