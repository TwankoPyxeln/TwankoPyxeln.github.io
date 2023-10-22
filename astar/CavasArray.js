class CanvasArray{
    constructor(breite=10, hoehe=10){
        this.feld = [[]]
        this.feldVorbereiten(breite, hoehe)
        this._fliesenGroesse = 10

        this.canvasMittelpunkt = {x:0, y:0}
        this.startPosition = {x:0, y:0}
    }

    feldVorbereiten(breite, hoehe){
        this.feld = []
        for( var i = 0; i < hoehe; i++ ){
            var reihe = new Array(breite).fill(0)
            this.feld.push(reihe)
        }
    }

    leinwandAuswaehlen(canvas){
        this.canvas = canvas
        this.ctx = canvas.getContext("2d")
        this.canvasMittelpunkt = {
            x: this.canvas.width/2,
            y: this.canvas.height/2
        }
        this.startPosition = {
            x: this.canvasMittelpunkt.x-.5 - this.feldBreite * this.fliesenGroesse/2,
            y: this.canvasMittelpunkt.y-.5 - this.feldHoehe * this.fliesenGroesse/2
        }
    }

    zeichneFeld(){
        // devhints.io/canvas sehr hilfreich
        this.ctx.lineWidth = 1
        for(var y = 0; y < this.feldHoehe; y++ ){
            for(var x = 0; x < this.feldBreite; x++ ){
                this.zeichneFliese(x, y)
            }
        }
    }

    zeichneFliese(x,y){
        var wert = this.getFliese(x,y)
        if (wert == -1) return
        if (wert == 0){
            this.ctx.clearRect(this.startPosition.x + x*this.fliesenGroesse,this.startPosition.y + y*this.fliesenGroesse ,this.fliesenGroesse,this.fliesenGroesse)
            this.ctx.strokeRect(this.startPosition.x + x*this.fliesenGroesse,this.startPosition.y + y*this.fliesenGroesse ,this.fliesenGroesse,this.fliesenGroesse)
            return
        }
        switch(wert){
            case 1:
                this.ctx.fillStyle = "black"
                break;
            case 2:
                this.ctx.fillStyle = "red"
                break;
            case 3:
                this.ctx.fillStyle = "blue"
                break;
        }
        this.ctx.fillRect(this.startPosition.x + x*this.fliesenGroesse,this.startPosition.y + y*this.fliesenGroesse ,this.fliesenGroesse,this.fliesenGroesse)
    }

    setzeFliese(x, y, wert){
        if (y >= this.feldHoehe || y < 0) return -1
        if (x >= this.feldBreite || x < 0) return -1
        this.feld[y][x] = wert
        console.log(x,y)
        this.zeichneFliese(x, y)
    }

    getFliese(x,y){
        if (y >= this.feldHoehe || y < 0) return -1
        if (x >= this.feldBreite || x < 0) return -1
        return this.feld[y][x]
    }

    get feldBreite (){
        return this.feld[0].length
    }

    get feldHoehe(){
        return this.feld.length
    }

    set fliesenGroesse(wert){
        this._fliesenGroesse = wert
        this.startPosition = {
            x: this.canvasMittelpunkt.x-.5 - this.feldBreite * this.fliesenGroesse/2,
            y: this.canvasMittelpunkt.y-.5 - this.feldHoehe * this.fliesenGroesse/2
        }
    }

    get fliesenGroesse(){
        return this._fliesenGroesse
    }

    clear(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
    }
}
