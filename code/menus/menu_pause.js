"use strict";

(function() {
    window.addEventListener("load", main);
}());

function main() {
    var resumeBtn= document.getElementById("resumeBtn");
    var restartBtn= document.getElementById("restartBtn");
    var optionsBtn= document.getElementById("optionsBtn");
    var levelsBtn= document.getElementById("levelsBtn");
    var quitBtn= document.getElementById("quitBtn");

    resumeBtn.addEventListener("click",muda_menu);
    restartBtn.addEventListener("click",muda_menu);
    optionsBtn.addEventListener("click",muda_menu);
    levelsBtn.addEventListener("click",muda_menu);
    quitBtn.addEventListener("click",muda_menu);
}

function muda_menu(ev) {
    let message;
    if(ev.id=="resumeBtn"){
        message= "Continua Jogo";
        window.parent.postMessage(message, '*')
    }
    else if(ev.id=="restartBtn"){
        message= "Começa Jogo";
        window.parent.postMessage(message, '*')
    }
    else if(ev.id=="optionsBtn"){
        message= "Muda Menu Options";
        window.parent.postMessage(message, '*')
    }
    else if(ev.id=="helpBtn"){
        message= "Muda Menu Help";
        window.parent.postMessage(message, '*')
    }
    else if(ev.id=="quitBtn"){
        message= "Fecha a aplicacao";
        window.parent.postMessage(message, '*')
    }
}