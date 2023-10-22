distanzQueue = []
function distanztick(){
    while(distanzQueue.length){
        var pos = distanzQueue.shift()
        if(grid.getFliese(pos.x,pos.y) == 0){
            grid.setzeFliese(pos.x,pos.y, 4)
            grid.setzeMeta(pos.x,pos.y, "distanz", pos.wert)
            distanzQueue.push({x:pos.x+1,y:pos.y,wert:pos.wert+1})
            distanzQueue.push({x:pos.x,y:pos.y+1,wert:pos.wert+1})
            distanzQueue.push({x:pos.x-1,y:pos.y,wert:pos.wert+1})
            distanzQueue.push({x:pos.x,y:pos.y-1,wert:pos.wert+1})
        }
        
    }
    grid.clear()
    grid.zeichneFeld()
    grid.zeichneMeta("distanz")
}


//setInterval(distanztick,3)