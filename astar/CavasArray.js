class CanvasArray{
    constructor(breite=10, hoehe=10){
        this.feld = [[]]
        this.feldMeta = [[]]
        this.feldVorbereiten(breite, hoehe)
        this._fliesenGroesse = 10

        this.canvasMittelpunkt = {x:0, y:0}
        this.startPosition = {x:0, y:0}
    }

    feldVorbereiten(breite, hoehe){
        this.feld = []
        this.feldMeta = []
        for( var i = 0; i < hoehe; i++ ){
            let reihe = new Array(breite).fill(0)
            this.feld.push(reihe)

            let metaReihe = []
            for(var j = 0; j < breite; j++){
                metaReihe.push({})
            }
            this.feldMeta.push(metaReihe)
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

    zeichneMeta(key){
        for(var y = 0; y < this.feldHoehe; y++ ){
            for(var x = 0; x < this.feldBreite; x++ ){
                if ( this.feldMeta[y][x][key] ){
                    this.ctx.fillStyle = "black"
                    this.ctx.textAlign = "center"
                    this.ctx.fillText(this.feldMeta[y][x][key], this.startPosition.x + x*this.fliesenGroesse+this.fliesenGroesse/2,this.startPosition.y + y*this.fliesenGroesse+this.fliesenGroesse/2)
                }
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
            case 4:
                var meta = this.getMeta(x,y)
                var distanz = meta.distanz
                this.ctx.fillStyle = `rgb(0,${255-distanz*8},0)`
                break;
        }
        this.ctx.fillRect(this.startPosition.x + x*this.fliesenGroesse,this.startPosition.y + y*this.fliesenGroesse ,this.fliesenGroesse,this.fliesenGroesse)
    }

    setzeFliese(x, y, wert){
        if (y >= this.feldHoehe || y < 0) return -1
        if (x >= this.feldBreite || x < 0) return -1
        this.feld[y][x] = wert
        //this.zeichneFliese(x, y)
    }

    setzeMeta(x, y, key, value){
        if (y >= this.feldHoehe || y < 0) return -1
        if (x >= this.feldBreite || x < 0) return -1
        this.feldMeta[y][x][key] = value
        this.zeichneFliese(x, y)
    }

    getFliese(x,y){
        if (y >= this.feldHoehe || y < 0) return -1
        if (x >= this.feldBreite || x < 0) return -1
        return this.feld[y][x]
    }

    getMeta(x,y){
        if (y >= this.feldHoehe || y < 0) return -1
        if (x >= this.feldBreite || x < 0) return -1
        return this.feldMeta[y][x]
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

    clearGrid(){
        for(var y = 0; y < this.feldHoehe; y++ ){
            for(var x = 0; x < this.feldBreite; x++ ){
                if(this.feld[y][x] != 1){
                    this.feld[y][x] = 0
                }
            }
        }
        grid.clear()
        grid.zeichneFeld()
    }

}
