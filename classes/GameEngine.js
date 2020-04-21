"use strict";

(function() {
	window.addEventListener("load", main);
}());

const TOT_HEROES=2
const ID_SASHA=0, ID_YIN=1
const BLOCK_SIZE=40
const BULLET_WIDTH=7, BULLET_HEIGHT=10, BULLET_SPEED=4

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
		heroes[ID_SASHA].img=heroes[ID_SASHA].stopped_sprites[0]
		heroes[ID_YIN].img=heroes[ID_YIN].stopped_sprites[0]
		heroes[ID_SASHA].imgData=heroes[ID_SASHA].getImageData()
		heroes[ID_YIN].imgData=heroes[ID_YIN].getImageData()
		drawSprites(ctx, blocos)
		drawSprites(ctx, heroes)
		animLoop(ctx, heroes, blocos)
	}
}

function initAllComponents(ctx) {
	var ids=["Left", "Right", "Up", "Down"]
	var blocos = new Array(1)
	var heroes = new Array(TOT_HEROES)
	heroes[ID_SASHA] = new Personagem(100, 100, BLOCK_SIZE, BLOCK_SIZE, 2)
	heroes[ID_YIN]= new Personagem(50, 50, BLOCK_SIZE, BLOCK_SIZE, 2)
	var walkingSasha, walkingYin, stoppedSasha, stoppedYin, bullet_sprite
	var nLoad = 0
	var totLoad= blocos.length+heroes[ID_SASHA].SPRITE_BULLETS+ heroes[ID_SASHA].SPRITE_IMGS*2*2
	for (let i = 0; i < heroes[ID_SASHA].SPRITE_IMGS; i++) {
		//	inicialize Array
		walkingYin= new Image()
		stoppedYin= new Image()
		walkingSasha= new Image()
		stoppedSasha= new Image()
		//	define IDs
		walkingYin.id= stoppedYin.id= "yin"+ids[i]
		walkingSasha.id=stoppedSasha.id= "sasha"+ids[i]
		//	define Walking Srcs
		walkingYin.src= "../resources/images/yin_sprite"+ids[i]+".gif"
		walkingSasha.src="../resources/images/Sasha_sprite"+ids[i]+".gif"
		//	define Walking Srcs
		stoppedYin.src= "../resources/images/yin_sprite"+ids[i]+"1.png"
		stoppedSasha.src="../resources/images/Sasha_sprite"+ids[i]+"1.png"
		//	load all Sprites
		stoppedYin.addEventListener("load", imgLoadedHandler)
		stoppedSasha.addEventListener("load", imgLoadedHandler)
		walkingYin.addEventListener("load", imgLoadedHandler)
		walkingSasha.addEventListener("load", imgLoadedHandler)
	}
	for (let i = 0, j=0; i < heroes[ID_SASHA].SPRITE_BULLETS; j++, i++) {
		bullet_sprite= new Image()
		if (i==4 || i==6) j=0
		if (i<4) {
			bullet_sprite.id="bullet"+ids[j]
			bullet_sprite.src= "../resources/images/bullet"+ids[j]+".png"
		} else if (i<6) {
			bullet_sprite.id="bulletDown"+ids[j]
			bullet_sprite.src= "../resources/images/bulletDown"+ids[j]+".png"
		} else {
			bullet_sprite.id="bulletUp"+ids[j]
			bullet_sprite.src= "../resources/images/bulletUp"+ids[j]+".png"
		}
		bullet_sprite.addEventListener("load", imgLoadedHandler)
	}

	var bloco= new Image()
	bloco.id="bloco"
	bloco.src="../resources/images/Game_slot_format.png"
	bloco.addEventListener("load", imgLoadedHandler)
		
	function imgLoadedHandler(ev) {
		var img = ev.target
		if (img.id.includes("sasha")==true && img.src.includes("png")) {
			heroes[ID_SASHA].stopped_sprites.push(img)
		} else if (img.id.includes("yin")==true && img.src.includes("png")) {
			heroes[ID_YIN].stopped_sprites.push(img)
		} else if (img.id.includes("sasha")==true && img.src.includes("gif")) {
			heroes[ID_SASHA].walking_sprites.push(img)
		} else if (img.id.includes("yin")==true  && img.src.includes("gif")) {
			heroes[ID_YIN].walking_sprites.push(img)
		} else if (img.id.includes("bullet")==true) {
			heroes[ID_SASHA].bullets.push(img)
			heroes[ID_YIN].bullets.push(img)
		} else if (img.id=="bloco") blocos[0]= new ElementoFixo(100, 50, BLOCK_SIZE, BLOCK_SIZE, img)

		nLoad++	
		if (nLoad == totLoad) {
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
	
	renderGame(ctx, heroes, blocos)
}

function renderGame(ctx, heroes, blocos) {
	let ch= ctx.canvas.height
	let cw= ctx.canvas.width
	
	detectKeyboard(heroes, blocos, ctx)

	heroes[ID_SASHA].detectIntersection(heroes[ID_YIN])
	heroes[ID_YIN].detectIntersection(heroes[ID_SASHA])
	heroes[ID_SASHA].detectIntersection(blocos[0])
	heroes[ID_YIN].detectIntersection(blocos[0])

	heroes[ID_SASHA].moving(cw, ch)
	heroes[ID_YIN].moving(cw, ch)

	ctx.clearRect(0, 0, cw, ch)
	drawSprites(ctx, heroes)
	drawSprites(ctx, blocos)
	}

function detectKeyboard(heroes, blocos, ctx) {
	function keyHandler(ev) { keyUpDownHandler(ev, heroes, blocos, ctx) }

	//	keyboard
	window.addEventListener("keydown", keyHandler)
	window.addEventListener("keyup", keyHandler)

}

/**
 * @param {Event} ev 
 * @param {Personagem} heroes
 */
function keyUpDownHandler(ev, heroes, blocos, ctx) {
	if (ev.type=="keydown") {
		if (ev.code=="Escape") console.log(ev.code) // menu pause
		// SHOOT YIN
		else if (ev.code=="Space") heroes[ID_YIN].shoot(ctx, heroes[ID_SASHA], blocos)
		// SHOOT SASHA
		else if (ev.code=="ShiftLeft") heroes[ID_SASHA].shoot(ctx, heroes[ID_YIN], blocos)
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

