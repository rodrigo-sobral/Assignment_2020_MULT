"use strict";

(function() {
    window.addEventListener("load", main);
}());

function main() {
    var trainingBtn= document.getElementById("trainingBtn");
    var jungleBtn= document.getElementById("jungleBtn");
    var warehouseBtn= document.getElementById("warehouseBtn");
    var cityBtn= document.getElementById("cityBtn");
    var backBtn= document.getElementById("backBtn");

    trainingBtn.addEventListener("click",muda_menu);
    jungleBtn.addEventListener("click",muda_menu);
    warehouseBtn.addEventListener("click",muda_menu);
    cityBtn.addEventListener("click",muda_menu);
    backBtn.addEventListener("click",muda_menu);
}

function muda_menu(ev) {
    let message;
    if(ev.id=="trainingBtn"){
        message= "Muda Niveis Training";
        window.parent.postMessage(message, '*')
    }
    else if(ev.id=="jungleBtn"){
        message= "Muda Niveis Jungle";
        window.parent.postMessage(message, '*')
    }
    else if(ev.id=="warehouseBtn"){
        message= "Muda Niveis Warehouse";
        window.parent.postMessage(message, '*')
    }
    else if(ev.id=="cityBtn"){
        message= "Muda Niveis City";
        window.parent.postMessage(message, '*')
    }
    else if(ev.id=="backBtn"){
        message= "Muda Menu Main";
        window.parent.postMessage(message, '*')
    }
}