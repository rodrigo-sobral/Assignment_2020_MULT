$ = jQuery;
var maxHealth = 500,
curHealth = maxHealth;

//=======================================
//				SASHA HEALTH
//=======================================
$(".SASHA-health-bar-text").html(curHealth);
$(".SASHA-health-bar").css({ "width": "100%" });
$(".add-damage").click(function() {
	if (curHealth != 0) {
		var damage = Math.floor((Math.random() * 100) + 50);
		$(".SASHA-health-bar-red, .SASHA-health-bar").stop();
		curHealth = curHealth - damage;
		if (curHealth < 0) {
			curHealth = 0;
			restart();
		}
		applyChange(curHealth);
	}
});
$(".add-heal").click(function() {
	if (curHealth != maxHealth) {
		var heal = Math.floor((Math.random() * 100) + 5);
		$(".SASHA-health-bar-red, .SASHA-health-bar-blue, .SASHA-health-bar").stop();
		curHealth = curHealth + heal;
		if (curHealth > maxHealth) {
			curHealth = maxHealth;
		}
		applyChange(curHealth);
	}
});

function applyChange(curHealth) {
	$(".SASHA-health-bar-text").html(curHealth);
	$(".SASHA-health-bar-red").animate({
		'width': curHealth + "%"
	}, 700);
	$(".SASHA-health-bar").animate({
		'width': curHealth + "%"
	}, 500);
	$(".SASHA-health-bar-blue").animate({
		'width': curHealth + "%"
	}, 300);
}

function restart() {
	$('.SASHA-health-bar-red, .SASHA-health-bar');
}

//=======================================
//				YIN HEALTH
//=======================================
$(".YIN-health-bar-text").html(curHealth);
$(".YIN-health-bar").css({ "width": "100%" });
$(".add-damage").click(function() {
	if (curHealth != 0) {
		var damage = Math.floor((Math.random() * 100) + 50);
		$(".YIN-health-bar-red, .YIN-health-bar").stop();
		curHealth = curHealth - damage;
		if (curHealth < 0) {
			curHealth = 0;
			restart();
		}
		applyChange(curHealth);
	}
});
$(".add-heal").click(function() {
	if (curHealth != maxHealth) {
		var heal = Math.floor((Math.random() * 100) + 5);
		$(".YIN-health-bar-red, .YIN-health-bar-blue, .YIN-health-bar").stop();
		curHealth = curHealth + heal;
		if (curHealth > maxHealth) {
			curHealth = maxHealth;
		}
		applyChange(curHealth);
	}
});

function applyChange(curHealth) {
	$(".YIN-health-bar-text").html(curHealth);
	$(".YIN-health-bar-red").animate({
		'width': curHealth + "%"
	}, 700);
	$(".YIN-health-bar").animate({
		'width': curHealth + "%"
	}, 500);
	$(".YIN-health-bar-blue").animate({
		'width': curHealth + "%"
	}, 300);
}

function restart() {
	$('.YIN-health-bar-red, .YIN-health-bar');
}