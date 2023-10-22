function leinwandKlick(e){
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor(( e.clientX - rect.left - grid.startPosition.x ) / grid.fliesenGroesse)
    const y = Math.floor(( e.clientY - rect.top - grid.startPosition.y ) / grid.fliesenGroesse)
    switch(modus){
        case "wand":
            grid.setzeFliese(x,y, 1)
            grid.zeichneFliese(x,y)

            grid.clearGrid()
            distanzQueue.push({x:10,y:10,wert:0})
            distanztick()
            break;
        case "leer":
            grid.setzeFliese(x,y, 0)
            grid.zeichneFliese(x,y)

            grid.clearGrid()
            distanzQueue.push({x:10,y:10,wert:0})
            distanztick()
            break;
        case "ziel":
            grid.setzeFliese(x,y, 2)
            grid.zeichneFliese(x,y)
            break;
        case "flood":
            floodfillqueue.push({x,y})
            floodfilltick()
            break;
        case "distanz":
            distanzQueue.push({x,y,wert:0})
            distanztick()
            break;
    }
}

function setzeModus(zielModus){
    modus = zielModus
}

function clearAll(){
    grid.clearGrid()
    floodfillqueue = []
    distanzQueue = []
}

modus = "wand"

var canvas = document.getElementById("myCanvas")
var grid = new CanvasArray(37,15)
grid.fliesenGroesse = 20
grid.leinwandAuswaehlen(canvas)
grid.zeichneFeld()