"use strict";

(function() {
	window.addEventListener("load", main);
}());

const TOT_HEROES=2
const ID_YIN=1
const ID_SASHA=0

function main() {
	var canvas = document.getElementById("canvas")
	var ctx = canvas.getContext("2d")
	var heroes

	init(ctx)
	canvas.addEventListener("initend", initEndHandler)

	function initEndHandler(ev) {
		heroes = ev.heroes
		drawHeroes(ctx, heroes)
		animLoop(ctx, heroes)
	}

}

function init(ctx) {
	var nLoad = 0
	var totLoad = TOT_HEROES 
	var heroes = new Array(totLoad);
	console.log("criar bonecos")
	var yin = new Image()
	var sasha= new Image()
	yin.id="yin"
	sasha.id="sasha"
	yin.src = "../resources/yin_sprite.png"
	sasha.src = "../resources/Sasha_sprite.png"
	yin.addEventListener("load", imgLoadedHandler)
	sasha.addEventListener("load", imgLoadedHandler)
	
	function imgLoadedHandler(ev) {
		var img = ev.target
		var nw = img.naturalWidth
		var nh = img.naturalHeight
		if (img.id=="yin") 
			heroes[ID_YIN]= new Personagem(50, 50, nw, nh, 2, img)
		else if (img.id=="sasha") 
			heroes[ID_SASHA] = new Personagem(100, 100, nw, nh, 2, img)

		nLoad++	
		if (nLoad == totLoad) {
			var ev2 = new Event("initend");
			ev2.heroes = heroes;
			ctx.canvas.dispatchEvent(ev2);
		}
	}
}

function animLoop(ctx, heroes) {
	var al = function() { animLoop(ctx, heroes) }
	var reqID = window.requestAnimationFrame(al)
	
	render(ctx, heroes, reqID)
}

//resedenho, actualizações, ...
function render(ctx, heroes, reqID) {
	let ch= ctx.canvas.height
	let cw= ctx.canvas.width

	detectKeyboard(heroes, cw, ch)
	
	ctx.clearRect(0, 0, cw, ch)
	drawHeroes(ctx, heroes)
}

function drawHeroes(ctx, heroes) {
	for (let i=0; i < heroes.length; i++) heroes[i].draw(ctx);
}
function clearHeroes(ctx, heroes) {
	for (let i=0; i < heroes.length; i++) heroes[i].clear(ctx);
}

function detectKeyboard(heroes, cw, ch) {
	function keyHandler(ev) { keyUpDownHandler(ev, heroes, cw,ch) }

	//	keyboard
	window.addEventListener("keydown", keyHandler)
	window.addEventListener("keyup", keyHandler)

	heroes[ID_SASHA].walking(cw, ch)
	heroes[ID_YIN].walking(cw, ch)
}

/**
 * @param {Event} ev 
 * @param {Personagem} heroes
 */
function keyUpDownHandler(ev, heroes, cw, ch) {
	if (ev.type=="keydown") {
		if (ev.code=="Escape") console.log(ev.code) // menu pause
		// MOVE YIN
		else if (ev.code=="ArrowUp" || ev.code=="ArrowDown" || ev.code=="ArrowRight" || ev.code=="ArrowLeft") 
			heroes[ID_YIN].detect_movement(ev.code, cw, ch)
		// MOVE SASHA
		else if (ev.code=="KeyW" || ev.code=="KeyS" || ev.code=="KeyA" || ev.code=="KeyD") 
			heroes[ID_SASHA].detect_movement(ev.code, cw, ch)
	} else if (ev.type=="keyup") {
		// PARA YIN
		if (ev.code=="ArrowUp" || ev.code=="ArrowDown" || ev.code=="ArrowRight" || ev.code=="ArrowLeft") 
			heroes[ID_YIN].stop(ev.code, cw, ch)
		// PARA SASHA
		else if (ev.code=="KeyW" || ev.code=="KeyS" || ev.code=="KeyA" || ev.code=="KeyD") 
			heroes[ID_SASHA].stop(ev.code, cw, ch)
	}
}
