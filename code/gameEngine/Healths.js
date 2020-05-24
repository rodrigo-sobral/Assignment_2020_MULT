"use strict"
$ = jQuery

class Healths {
	constructor (sashaHealth, yinHealth) {
		this.sashaFullHealth = sashaHealth
		this.yinFullHealth= yinHealth	
		this.sashaCurHealth = this.sashaFullHealth
		this.yinCurHealth = this.yinFullHealth
		$(".SASHA-health-bar-text").html("Sasha "+this.sashaCurHealth)
		$(".SASHA-health-bar").css({ "width": "100%"})
		$(".YIN-health-bar-text").html("Yin "+this.yinCurHealth)
		$(".YIN-health-bar").css({ "width": "100%"})
	}

	//=======================================
	//				SASHA HEALTH
	//=======================================
	damageSasha(damage) {
		if (this.sashaCurHealth != 0) {
			$(".SASHA-health-bar-red, .SASHA-health-bar").stop()
			this.sashaCurHealth = this.sashaCurHealth - damage
			if (this.sashaCurHealth < 0) {
				this.sashaCurHealth = 0
				$('.SASHA-health-bar-red, .SASHA-health-bar')
			}
			this.applySashaChange()
		}
	}
	healSasha() {
		if (this.sashaCurHealth != this.sashaFullHealth) {
			$(".SASHA-health-bar-red, .SASHA-health-bar-blue, .SASHA-health-bar").stop()
			this.sashaCurHealth = this.sashaFullHealth
			if (this.sashaCurHealth > this.sashaFullHealth) {
				this.sashaCurHealth = this.sashaFullHealth
			}
			this.applySashaChange()
		}
	}

	applySashaChange() {
		if (this.sashaCurHealth!=0) $(".SASHA-health-bar-text").html("Sasha "+this.sashaCurHealth)
		else $(".SASHA-health-bar-text").html("Sasha DEAD")
		$(".SASHA-health-bar-red").animate({
			'width': this.sashaCurHealth + "%"
		}, 700)
		$(".SASHA-health-bar").animate({
			'width': this.sashaCurHealth + "%"
		}, 500)
		$(".SASHA-health-bar-blue").animate({
			'width': this.sashaCurHealth + "%"
		}, 300)
	}

	//=======================================
	//				YIN HEALTH
	//=======================================
	
	damageYin(damage) {
		if (this.yinCurHealth != 0) {
			$(".YIN-health-bar-red, .YIN-health-bar").stop()
			this.yinCurHealth = this.yinCurHealth - damage
			if (this.yinCurHealth < 0) {
				this.yinCurHealth = 0
				$('.YIN-health-bar-red, .YIN-health-bar')
			}
			this.applyYinChange()
		}
	}
	healYin() {
		if (this.yinCurHealth != this.yinFullHealth) {
			$(".YIN-health-bar-red, .YIN-health-bar-blue, .YIN-health-bar").stop()
			this.yinCurHealth = this.yinFullHealth
			if (this.yinCurHealth > this.yinFullHealth) {
				this.yinCurHealth = this.yinFullHealth
			}
			this.applyYinChange()
		}
	}

	applyYinChange() {
		if (this.sashaCurHealth!=0) $(".YIN-health-bar-text").html("Yin "+this.yinCurHealth)
		else $(".SASHA-health-bar-text").html("Yin DEAD")
		
		$(".YIN-health-bar-red").animate({
			'width': this.yinCurHealth + "%"
		}, 700)
		$(".YIN-health-bar").animate({
			'width': this.yinCurHealth + "%"
		}, 500)
		$(".YIN-health-bar-blue").animate({
			'width': this.yinCurHealth + "%"
		}, 300)
	}
}