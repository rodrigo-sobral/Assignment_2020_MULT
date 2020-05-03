"use strict";

(function() {
    window.addEventListener("load", main);
}());

function main() {
    var level1Btn= document.getElementById("level1Btn");
    var level2Btn= document.getElementById("level2Btn");
    var level3Btn= document.getElementById("level3Btn");
    var level4Btn= document.getElementById("level4Btn");
    var level5Btn= document.getElementById("level5Btn");
    var backBtn= document.getElementById("backBtn");

    level1Btn.addEventListener("click",muda_menu);
    level2Btn.addEventListener("click",muda_menu);
    level3Btn.addEventListener("click",muda_menu);
    level4Btn.addEventListener("click",muda_menu);
    level5Btn.addEventListener("click",muda_menu);
    backBtn.addEventListener("click",muda_menu);
}

function muda_menu(ev) {
    let message;
    if(ev.id=="level1Btn"){
        message= "Muda Nivel 1";
        window.parent.postMessage(message, '*')
    }
    else if(ev.id=="level1Btn"){
        message= "Muda Nivel 2";
        window.parent.postMessage(message, '*')
    }
    else if(ev.id=="level1Btn"){
        message= "Muda Nivel 3";
        window.parent.postMessage(message, '*')
    }
    else if(ev.id=="level1Btn"){
        message= "Muda Nivel 4";
        window.parent.postMessage(message, '*')
    }
    else if(ev.id=="level1Btn"){
        message= "Muda Nivel 5";
        window.parent.postMessage(message, '*')
    }
    else if(ev.id=="backBtn"){
        message= "Muda Menu Arcs";
        window.parent.postMessage(message, '*')
    }
}