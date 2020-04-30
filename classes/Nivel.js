"use strict"

class Nivel {
    constructor(id, chapter) {
        this.id=id
        this.chapter=chapter
        if (this.id==0 && this.chapter==0) this.locked= false
        else this.locked= true
    }

}