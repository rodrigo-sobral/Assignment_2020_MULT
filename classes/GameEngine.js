"use strict";

(function() {
	window.addEventListener("load", main);
}());

const TOT_HEROES=2
const ID_SASHA=0, ID_YIN=1
const BLOCK_SIZE=50

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
	var sashaSprite, yinSprite, auxYin, auxSasha, bullet_sprite
	var nLoad = 0
	//			blocos + bullets + posiçoes paradas + posiçoes caminhando
	var totLoad= blocos.length + 8 + 8 + 16

	// LOAD STOPPED HEROES
	for (let i=0; i<4; i++) {
		sashaSprite= new Image()
		yinSprite= new Image()
		yinSprite.id= "yin"+ids[i]
		sashaSprite.id= "sasha"+ids[i]
		yinSprite.src= "../resources/images/yin_sprite"+ids[i]+"1.png"
		sashaSprite.src="../resources/images/Sasha_sprite"+ids[i]+"1.png"
		yinSprite.addEventListener("load", imgLoadedHandler)
		sashaSprite.addEventListener("load", imgLoadedHandler)		
	}

	// LOAD WALKING HEROES
	for (let i = 0; i < 4; i++) {
		yinSprite= new Image()
		sashaSprite= new Image()
		auxSasha= new Image()
		auxYin= new Image()
		yinSprite.id= "yin"+ids[i]+"2"
		sashaSprite.id= "sasha"+ids[i]+"2"
		auxYin.id="yin"+ids[i]+"3"
		auxSasha.id="sasha"+ids[i]+"3"
		yinSprite.src= "../resources/images/yin_sprite"+ids[i]+"2.png"
		sashaSprite.src="../resources/images/Sasha_sprite"+ids[i]+"2.png"
		auxYin.src= "../resources/images/yin_sprite"+ids[i]+"3.png"
		auxSasha.src="../resources/images/Sasha_sprite"+ids[i]+"3.png"
		yinSprite.addEventListener("load", imgLoadedHandler)
		sashaSprite.addEventListener("load", imgLoadedHandler)
		auxYin.addEventListener("load", imgLoadedHandler)
		auxSasha.addEventListener("load", imgLoadedHandler)
	}

	//	LOAD BULLETS
	for (let i = 0, j=0; i < 8; j++, i++) {
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
		if (img.id.includes("sasha")==true) {
			if (img.src.includes("1.png")) heroes[ID_SASHA].stopped_sprites.push(img)
			else if (img.id.includes(ids[0])) heroes[ID_SASHA].walking_sprites[0].push(img)
			else if (img.id.includes(ids[1])) heroes[ID_SASHA].walking_sprites[1].push(img)
			else if (img.id.includes(ids[2])) heroes[ID_SASHA].walking_sprites[2].push(img)
			else if (img.id.includes(ids[3])) heroes[ID_SASHA].walking_sprites[3].push(img)
		} else if (img.id.includes("yin")==true) {
			if (img.src.includes("1.png")) heroes[ID_YIN].stopped_sprites.push(img)
			else if (img.id.includes(ids[0])) heroes[ID_YIN].walking_sprites[0].push(img)
			else if (img.id.includes(ids[1])) heroes[ID_YIN].walking_sprites[1].push(img)
			else if (img.id.includes(ids[2])) heroes[ID_YIN].walking_sprites[2].push(img)
			else if (img.id.includes(ids[3])) heroes[ID_YIN].walking_sprites[3].push(img)
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
	renderBullets(ctx, heroes[ID_SASHA], heroes[ID_YIN], blocos[0])
	renderBullets(ctx, heroes[ID_YIN], heroes[ID_SASHA], blocos[0])

	heroes[ID_SASHA].moving(cw, ch)
	heroes[ID_YIN].moving(cw, ch)
	
	ctx.clearRect(0, 0, cw, ch)
	drawSprites(ctx, heroes)
	drawSprites(ctx, blocos)
	drawSprites(ctx, heroes[ID_SASHA].activated_bullets)
	drawSprites(ctx, heroes[ID_YIN].activated_bullets)
}

function renderBullets(ctx, hero, hero2, blocos) {
	// 	false	- if bullet touches in something or is not initialized
	// 	true 	- if is everyhing okay and shall draw it
	let bullets= hero.activated_bullets
	let cw=ctx.canvas.width, ch=ctx.canvas.height
	if (bullets.length==0) return false
	for (let i=0; i<bullets.length; i++) {
		if (hero2.intersectionWith(bullets[i])==false && blocos.intersectionWith(bullets[i])==false) {
			if (bullets[i].x>0 && bullets[i].x+bullets[i].width<cw && bullets[i].y>0 && bullets[i].y+bullets[i].height<ch) bullets[i].moving(cw, ch)
			else {
				hero.activated_bullets.splice(i,1)
			}
		} else {
			hero.activated_bullets.splice(i,1)
		}
	}
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
		else if (ev.code=="ShiftRight" && heroes[ID_YIN].keyStatus.firing==false) heroes[ID_YIN].defineBullet()
		// SHOOT SASHA
		else if (ev.code=="ShiftLeft" && heroes[ID_SASHA].keyStatus.firing==false) heroes[ID_SASHA].defineBullet()
		// MOVE YIN
		else if (ev.code=="ArrowUp" || ev.code=="ArrowDown" || ev.code=="ArrowRight" || ev.code=="ArrowLeft") 
			heroes[ID_YIN].detect_movement(ev.code)
		// MOVE SASHA
		else if (ev.code=="KeyW" || ev.code=="KeyS" || ev.code=="KeyA" || ev.code=="KeyD") 
			heroes[ID_SASHA].detect_movement(ev.code)
	} else if (ev.type=="keyup") {
		// STOP SHOOTING YIN
		if (ev.code=="ShiftRight" && heroes[ID_YIN].keyStatus.firing==true) heroes[ID_YIN].keyStatus.firing=false 
		// STOP SHOOTING SASHA
		else if (ev.code=="ShiftLeft" && heroes[ID_SASHA].keyStatus.firing==true) heroes[ID_SASHA].keyStatus.firing=false 
		// PARA YIN
		else if (ev.code=="ArrowUp" || ev.code=="ArrowDown" || ev.code=="ArrowRight" || ev.code=="ArrowLeft") 
			heroes[ID_YIN].stop(ev.code)
		// PARA SASHA
		else if (ev.code=="KeyW" || ev.code=="KeyS" || ev.code=="KeyA" || ev.code=="KeyD") 
			heroes[ID_SASHA].stop(ev.code)
	}
}
