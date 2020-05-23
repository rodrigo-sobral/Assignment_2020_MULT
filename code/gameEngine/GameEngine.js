"use strict";

(function() {
	window.addEventListener("load", main);
}());

const TOT_HEROES=2
const ID_SASHA=0, ID_YIN=1
const BLOCK_SIZE=32
const CHARACTER_SIZE=40
const MAX_LOOSING_HP=50, MIN_LOOSING_HP=20

function main() {
	var canvas = document.getElementById("canvas")
	var ctx = canvas.getContext("2d")
	var heroes, enemies, healths
	var career = LoadCareer()
	var level1= new Nivel(1, "training_camp", "../resources/images/maps/Training Camp/level1.png", canvas, ctx)

	playBackgroundMusic()

	initAllComponents(ctx)
	canvas.addEventListener("initend", initEndHandler)

	function initEndHandler(ev) {
		heroes= ev.heroes
		enemies= ev.enemies
		healths= ev.healths

		heroes[ID_SASHA].img=heroes[ID_SASHA].stopped_sprites[1]
		heroes[ID_YIN].img=heroes[ID_YIN].stopped_sprites[1]
		heroes[ID_SASHA].imgData=heroes[ID_SASHA].getImageData()
		heroes[ID_YIN].imgData=heroes[ID_YIN].getImageData()

		enemies[0].img=enemies[0].stopped_sprites[3]
		enemies[0].imgData=enemies[0].getImageData()
		
		ctx.drawImage(level1.backgroundLevel, 0, 0, ctx.canvas.width, ctx.canvas.height)
		drawBlocks(ctx, level1.hardBlockArray)
		drawSprites(ctx, enemies)
		drawSprites(ctx, heroes)
		animLoop(ctx, heroes, enemies, level1, healths)
	}
}

function LoadCareer() {
	let career = JSON.parse(localStorage.getItem('career'));
	return career
}

function playBackgroundMusic() {
	if (localStorage.getItem('sound') === null) {
		var backgroundMusic = new Sound(1, 1)
		localStorage.setItem('sound', JSON.stringify(backgroundMusic));
	} else {
		var backgroundMusic = JSON.parse(localStorage.getItem('sound'));
	}
	var sound = new Audio("../../resources/sounds/menuBackgroundMusic.mp3")
	sound.volume = backgroundMusic.volume
	sound.loop = true
	sound.autoplay = true
	sound.play()
}

function initAllComponents(ctx) {
	var ids=["Left", "Right", "Up", "Down"]
	var enemies = new Array(1)
	var heroes = new Array(TOT_HEROES)
	heroes[ID_SASHA] = new Personagem(100, 360, CHARACTER_SIZE, CHARACTER_SIZE, 2)
	heroes[ID_YIN]= new Personagem(50, 400, CHARACTER_SIZE, CHARACTER_SIZE, 2)
	enemies[0]= new Inimigo(400, 100, CHARACTER_SIZE, CHARACTER_SIZE, 1)
	var sashaSprite, yinSprite, auxYin, auxSasha, bullet_sprite
	var enemieSprite, auxEnemie
	var nLoad = 0
	//	enemies + bullets + posiçoes paradas + posiçoes caminhando
	var totLoad= enemies.length*12 + 8 + 2*12

	// LOAD STOPPED HEROES
	for (let i=0; i<4; i++) {
		sashaSprite= new Image()
		yinSprite= new Image()
		yinSprite.id= "yin"+ids[i]
		sashaSprite.id= "sasha"+ids[i]
		yinSprite.src= "../resources/images/heroes/yin_sprite"+ids[i]+"1.png"
		sashaSprite.src="../resources/images/heroes/Sasha_sprite"+ids[i]+"1.png"
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
		yinSprite.src= "../resources/images/heroes/yin_sprite"+ids[i]+"2.png"
		sashaSprite.src="../resources/images/heroes/Sasha_sprite"+ids[i]+"2.png"
		auxYin.src= "../resources/images/heroes/yin_sprite"+ids[i]+"3.png"
		auxSasha.src="../resources/images/heroes/Sasha_sprite"+ids[i]+"3.png"
		yinSprite.addEventListener("load", imgLoadedHandler)
		sashaSprite.addEventListener("load", imgLoadedHandler)
		auxYin.addEventListener("load", imgLoadedHandler)
		auxSasha.addEventListener("load", imgLoadedHandler)
	}

	//	STOPPED AGENT
	for (let i=0; i<4; i++) {
		enemieSprite= new Image()
		enemieSprite.id= "enemie"+ids[i]
		enemieSprite.src= "../resources/images/enemies/agent_"+ids[i]+"1.png"
		enemieSprite.addEventListener("load", imgLoadedHandler)
	}

	//	MOVING AGENT
	for (let i=0; i<4; i++) {
		enemieSprite= new Image()
		auxEnemie= new Image()
		enemieSprite.id= "enemie"+ids[i]+"2"
		auxEnemie.id="enemie"+ids[i]+"3"
		enemieSprite.src= "../resources/images/enemies/agent_"+ids[i]+"2.png"
		auxEnemie.src="../resources/images/enemies/agent_"+ids[i]+"3.png"
		enemieSprite.addEventListener("load", imgLoadedHandler)
		auxEnemie.addEventListener("load", imgLoadedHandler)
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

	function imgLoadedHandler(ev) {
		var img = ev.target
		if (img.id.includes("sasha")==true) {
			if (img.src.includes("1.png")) {
				if (img.id.includes(ids[0])) heroes[ID_SASHA].stopped_sprites[0]=img
				else if (img.id.includes(ids[1])) heroes[ID_SASHA].stopped_sprites[1]=img
				else if (img.id.includes(ids[2])) heroes[ID_SASHA].stopped_sprites[2]=img
				else if (img.id.includes(ids[3])) heroes[ID_SASHA].stopped_sprites[3]=img
			} else {
				if (img.id.includes(ids[0])) heroes[ID_SASHA].walking_sprites[0].push(img)
				else if (img.id.includes(ids[1])) heroes[ID_SASHA].walking_sprites[1].push(img)
				else if (img.id.includes(ids[2])) heroes[ID_SASHA].walking_sprites[2].push(img)
				else if (img.id.includes(ids[3])) heroes[ID_SASHA].walking_sprites[3].push(img)
			}
		} else if (img.id.includes("yin")==true) {
			if (img.src.includes("1.png")) {
				if (img.id.includes(ids[0])) heroes[ID_YIN].stopped_sprites[0]=img
				else if (img.id.includes(ids[1])) heroes[ID_YIN].stopped_sprites[1]=img
				else if (img.id.includes(ids[2])) heroes[ID_YIN].stopped_sprites[2]=img
				else if (img.id.includes(ids[3])) heroes[ID_YIN].stopped_sprites[3]=img
			} else {
				if (img.id.includes(ids[0])) heroes[ID_YIN].walking_sprites[0].push(img)
				else if (img.id.includes(ids[1])) heroes[ID_YIN].walking_sprites[1].push(img)
				else if (img.id.includes(ids[2])) heroes[ID_YIN].walking_sprites[2].push(img)
				else if (img.id.includes(ids[3])) heroes[ID_YIN].walking_sprites[3].push(img)
			}
		} else if (img.id.includes("enemie")==true) {
			if (img.src.includes("1.png")) {
				if (img.id.includes(ids[0]))enemies[0].stopped_sprites[0]=img
				else if (img.id.includes(ids[1]))enemies[0].stopped_sprites[1]=img
				else if (img.id.includes(ids[2]))enemies[0].stopped_sprites[2]=img
				else if (img.id.includes(ids[3]))enemies[0].stopped_sprites[3]=img
			} else {
				if (img.id.includes(ids[0]))enemies[0].walking_sprites[0].push(img)
				else if (img.id.includes(ids[1]))enemies[0].walking_sprites[1].push(img)
				else if (img.id.includes(ids[2]))enemies[0].walking_sprites[2].push(img)
				else if (img.id.includes(ids[3]))enemies[0].walking_sprites[3].push(img)
			}
		} else if (img.id.includes("bullet")==true) {
			heroes[ID_SASHA].bullets.push(img)
			heroes[ID_YIN].bullets.push(img)
			enemies[0].bullets.push(img)
		}

		nLoad++	
		if (nLoad == totLoad) {
			var ev2 = new Event("initend");
			ev2.heroes= heroes
			ev2.enemies= enemies
			ev2.healths= new Healths(heroes[ID_SASHA].health, heroes[ID_YIN].health)
			ctx.canvas.dispatchEvent(ev2);
		}
	}
}

function drawSprites(ctx, sprites) {
	for (let i=0; i < sprites.length; i++) {
		if (sprites[i]!=undefined) sprites[i].draw(ctx);
	}
}

function drawBlocks(ctx, blocks) {
	for (let i=0; i < blocks.length; i++) {
		for (let j = 0; j<blocks[i].length; j++) {
			if (blocks[i][j]!=0) blocks[i][j].draw(ctx);
		}
	}
}

function animLoop(ctx, heroes, enemies, level, healths) {
	var al = function() { animLoop(ctx, heroes, enemies, level, healths) }
	window.requestAnimationFrame(al)
	
	renderGame(ctx, heroes, enemies, level, healths)
}

function renderGame(ctx, heroes, enemies, level, healths) {
	let ch= ctx.canvas.height
	let cw= ctx.canvas.width
	let blocks= level.hardBlockArray
	
	detectKeyboard(heroes, enemies, ctx)

	//	INTERSECTIONS WITH BLOCKS
	allBlockColisions(heroes[ID_SASHA], blocks)

	//	INTERSECTIONS BETWEEN HEROES
	if (heroes[ID_YIN]!=undefined && heroes[ID_SASHA]!=undefined) {
		heroes[ID_SASHA].detectIntersection(heroes[ID_YIN])
		heroes[ID_YIN].detectIntersection(heroes[ID_SASHA])
	}
	//	INTERSECTIONS WITH ENEMIES
	if (enemies[0]!=undefined) {
		if (heroes[ID_SASHA]!=undefined) heroes[ID_SASHA].detectIntersection(enemies[0])
		if (heroes[ID_YIN]!=undefined) heroes[ID_YIN].detectIntersection(enemies[0])
	}

	//	DRAW BULLETS WHEN FIRING
	renderBullets(ctx, heroes[ID_SASHA], heroes, ID_SASHA, enemies, undefined)
	renderBullets(ctx, heroes[ID_YIN], heroes, ID_YIN, enemies, undefined)
	renderBullets(ctx, enemies[0], enemies, 0, heroes, healths)

	//	HEROES MOVEMENT
	if (heroes[ID_SASHA]!=undefined) heroes[ID_SASHA].moving(cw, ch)
	if (heroes[ID_YIN]!=undefined) heroes[ID_YIN].moving(cw, ch)
	if (enemies[0]!=undefined) enemies[0].updateAimFollow(heroes, ctx)
	

	ctx.clearRect(0, 0, cw, ch)
	//	=====================
	//	DRAW EVERYTING HERE
	//	=====================
	//	DRAW MAP
	ctx.drawImage(level.backgroundLevel, 0, 0, cw, ch)
	drawBlocks(ctx, blocks)
	//	DRAW CHARACTERES
	drawSprites(ctx, heroes)
	drawSprites(ctx, enemies)
	//	DRAW BULLETS
	if (heroes[ID_SASHA]!=undefined) drawSprites(ctx, heroes[ID_SASHA].activated_bullets)
	if (heroes[ID_YIN]!=undefined) drawSprites(ctx, heroes[ID_YIN].activated_bullets)
	if (enemies[0]!=undefined) drawSprites(ctx, enemies[0].activated_bullets)
}

function renderBullets(ctx, shooter, friendly, own, hostile, healths) {
	if (shooter==undefined) return
	let bullets= shooter.activated_bullets
	let cw=ctx.canvas.width, ch=ctx.canvas.height
	let moving_flag
	let intersectsHostile, intersectsFriendly
	if (bullets.length==0) return

	for (let i=0; i<bullets.length; i++) {
		moving_flag=false
		//	CHECK LIMITS OF THE GAME CANVAS
		if (bullets[i].x>0 && bullets[i].x+bullets[i].width<cw && bullets[i].y>0 && bullets[i].y+bullets[i].height<ch) {
			for (let sht_host=0, sht_frd=0; sht_host<hostile.length || sht_frd<friendly.length; sht_host++, sht_frd++) {
				intersectsHostile= intersectsFriendly= false
				//	CHECK THE BULLETS FIRING
				if (bullets.length==0 || i==bullets.length) return

				if (hostile[sht_host]!=undefined && sht_host<hostile.length) 
					intersectsHostile= hostile[sht_host].intersectionWith(bullets[i])
				if (friendly[sht_frd]!=undefined && sht_frd<friendly.length && sht_frd!=own) 
					intersectsFriendly= friendly[sht_frd].intersectionWith(bullets[i])
				//	CHECK INTERSECTION WITH ENEMIES OF FRIENDLY HERO
				if (intersectsHostile==false && intersectsFriendly==false) {
					if (moving_flag==false) {
						bullets[i].moving(cw, ch)
						moving_flag=true
					}
				} else {
					shooter.activated_bullets.splice(i,1)
					if (sht_host<hostile.length) {
						damageCalculator(shooter, hostile, sht_host, healths)
					}
				}
			}
		} else shooter.activated_bullets.splice(i,1)
	}
}

function damageCalculator(shooter, hostile, sht_host, healths) {
	let damage
	if (Inimigo.prototype.isPrototypeOf(shooter)==true && Personagem.prototype.isPrototypeOf(hostile[sht_host])==true) { 
		damage= Math.floor(Math.random() * (MAX_LOOSING_HP/2 - MIN_LOOSING_HP/2) ) + MIN_LOOSING_HP/2
		hostile[sht_host].health-= damage
		if (sht_host==ID_SASHA) healths.damageSasha(damage)
		else if (sht_host==ID_YIN) healths.damageYin(damage)
	} else if (Personagem.prototype.isPrototypeOf(shooter)==true && Inimigo.prototype.isPrototypeOf(hostile[sht_host])==true) {
		damage= Math.floor(Math.random() * (MAX_LOOSING_HP - MIN_LOOSING_HP) ) + MIN_LOOSING_HP
		hostile[sht_host].health-= damage
	} if (hostile[sht_host].health<=0) {
		if (hostile[sht_host].health<0) hostile[sht_host].health=0
		hostile[sht_host].walkingSound.pause()
		hostile[sht_host]=undefined
	}
}

function detectKeyboard(heroes) {
	function keyHandler(ev) { keyUpDownHandler(ev, heroes) }

	//	keyboard
	window.addEventListener("keydown", keyHandler)
	window.addEventListener("keyup", keyHandler)

}

function keyUpDownHandler(ev, heroes) {
	if (ev.type=="keydown") {
		if (ev.code=="Escape") 
			location.replace("html/menu_newgame.html")
		// SHOOT YIN
		else if (ev.code=="ShiftRight" && heroes[ID_YIN]!=undefined && heroes[ID_YIN].keyStatus.firing==false) 
			heroes[ID_YIN].defineBullet()
		// SHOOT SASHA
		else if (ev.code=="ShiftLeft" && heroes[ID_SASHA]!=undefined && heroes[ID_SASHA].keyStatus.firing==false) 
			heroes[ID_SASHA].defineBullet()
		// MOVE YIN
		else if ((ev.code=="ArrowUp" || ev.code=="ArrowDown" || ev.code=="ArrowRight" || ev.code=="ArrowLeft") && heroes[ID_YIN]!=undefined)  
			heroes[ID_YIN].detect_movement(ev.code)
		// MOVE SASHA
		else if ((ev.code=="KeyW" || ev.code=="KeyS" || ev.code=="KeyA" || ev.code=="KeyD") && heroes[ID_SASHA]!=undefined) 
			heroes[ID_SASHA].detect_movement(ev.code)
	} else if (ev.type=="keyup") {
		// STOP SHOOTING YIN
		if (ev.code=="ShiftRight" && heroes[ID_YIN]!=undefined && heroes[ID_YIN].keyStatus.firing==true) 
			heroes[ID_YIN].keyStatus.firing=false 
		// STOP SHOOTING SASHA
		else if (ev.code=="ShiftLeft" && heroes[ID_SASHA]!=undefined && heroes[ID_SASHA].keyStatus.firing==true) 
			heroes[ID_SASHA].keyStatus.firing=false 
		// PARA YIN
		else if ((ev.code=="ArrowUp" || ev.code=="ArrowDown" || ev.code=="ArrowRight" || ev.code=="ArrowLeft") && heroes[ID_YIN]!=undefined) 
			heroes[ID_YIN].stop(ev.code)
		// PARA SASHA
		else if ((ev.code=="KeyW" || ev.code=="KeyS" || ev.code=="KeyA" || ev.code=="KeyD") && heroes[ID_SASHA]!=undefined) 
			heroes[ID_SASHA].stop(ev.code)
	}
}

function allBlockColisions(character, block_matrix) {
	for (let i = 0; i < block_matrix.length; i++) {
		for (let j = 0; j < block_matrix[i].length; j++) {
			if (block_matrix[i][j]!=0) {
				character.detectIntersection(block_matrix[i][j])
			}
		}		
	}
}