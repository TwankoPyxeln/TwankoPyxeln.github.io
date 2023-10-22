floodfillqueue = []
function floodfilltick(){
    if(floodfillqueue.length){
        var pos = floodfillqueue.shift()
        if(grid.getFliese(pos.x,pos.y) == 0){
            grid.setzeFliese(pos.x,pos.y, 3)
            floodfillqueue.push({x:pos.x+1,y:pos.y})
            floodfillqueue.push({x:pos.x,y:pos.y+1})
            floodfillqueue.push({x:pos.x-1,y:pos.y})
            floodfillqueue.push({x:pos.x,y:pos.y-1})
        }
        zeichneQueue()
    }
}

function zeichneQueue(){
    grid.clear()
    grid.zeichneFeld()
    for(var entry of floodfillqueue){
        grid.ctx.fillStyle = "orange"
        var x = entry.x
        var y = entry.y
        grid.ctx.fillRect(grid.startPosition.x + x*grid.fliesenGroesse+5,grid.startPosition.y + y*grid.fliesenGroesse+5,grid.fliesenGroesse-10,grid.fliesenGroesse-10)
    }
}

setInterval(floodfilltick,10)