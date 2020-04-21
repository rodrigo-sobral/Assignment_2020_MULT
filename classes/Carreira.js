"use strict"

const START_LEVEL=0

class Carreira {
    constructor(nome) {
        this.nome=nome
        this.nivel=START_LEVEL
        this.data_criacao= new Date()
        this.campaign= [new Capitulo("Baby Steps", 0), new Capitulo("Getting Informations", 1), new Capitulo("Welcome To The Jungle", 2), new Capitulo("The Chemical Key", 3), new Capitulo("The Presidential Escape", 4)]
    }

}