function leinwandKlick(e){
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor(( e.clientX - rect.left - grid.startPosition.x ) / grid.fliesenGroesse)
    const y = Math.floor(( e.clientY - rect.top - grid.startPosition.y ) / grid.fliesenGroesse)
    switch(modus){
        case "wand":
            grid.setzeFliese(x,y, 1)
            break;
        case "leer":
            grid.setzeFliese(x,y, 0)
            break;
        case "ziel":
            grid.setzeFliese(x,y, 2)
            break;
        case "flood":
            floodfillqueue.push({x,y})
            floodfilltick()
            break;
    }
}

function setzeModus(zielModus){
    modus = zielModus
}

modus = "wand"

var canvas = document.getElementById("myCanvas")
var grid = new CanvasArray(37,15)
grid.fliesenGroesse = 20
grid.leinwandAuswaehlen(canvas)
grid.zeichneFeld()