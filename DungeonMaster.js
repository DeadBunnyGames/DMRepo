var width;
var height;
var FPS = 60;

var canvasElement = document.getElementById('canvas');
var ctx = canvasElement;

var map = [];
var cellWidth = 15;//made the cells fit the canvas
var cellHeight = 15;
var HQSize = 4;
var clicked = false;
var mx = 0;
var my = 0;

if(canvasElement.getContext)
{
    ctx = canvasElement.getContext("2d");

    setInterval(function() {
        update();
        draw();
    }, 1000/FPS);
}
else { alert("Your browser doesn't support <canvas>."); }

function Cell(x, y, type, collide)
{
	var b = {};

	b.x = x;
	b.y = y;
	b.width= cellWidth;
	b.height = cellHeight;
	b.type = type;
	b.collide = collide;

	return b;
}

function createWorld(x, y)
{
    for(var i=0; i<x; i++)
    {
        map[i] = [];
        for(var j=0; j<y; j++)
        {
            //Start Room
            if((i>=(x/2)-(HQSize/2) && i<=(x/2)+(HQSize/2)) && (j>=(y/2)-(HQSize/2) && j<=(y/2)+(HQSize/2)))
                map[i][j] = new Cell(i, j, 0, false);
            else //Blackness
                map[i][j] = new Cell(i, j, 1, true);
        }
    }
}

createWorld(50, 50);

width = map.length * cellWidth;
height = map[0].length * cellHeight + 200;

canvasElement.width = width;
canvasElement.height = height;

function update()
{
    if(clicked == true)
    {
        if(map[getMapX(mx)][getMapY(my)].type > 0)
        {
            map[getMapX(mx)][getMapY(my)].type = 2;
        }
    }
}

function draw()
{
    ctx.clearRect(0, 0, width, height);
    
    for(var i=0; i<map.length; i++)
    {
        for(var j=0; j<map[i].length; j++)
        {
            if(map[i][j].type == 0) { ctx.fillStyle = "white"; }
            else if(map[i][j].type == 1) { ctx.fillStyle = "black"; }
            else if(map[i][j].type == 2) { ctx.fillStyle = "green"; }//added green to tell where I clicked
            ctx.fillRect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
        }
    }
}
function getMapX(pos)
{
    for(var i=0; i<map.length; i++)
	{
        if ( pos >= i*cellWidth && pos <= (i+1)*cellWidth )
		{
			if(pos < height - 200)
                return i;
        }
    }
    return;
}

function getMapY(pos)
{
    for(var j=0; j<map.length; j++)
	{
        if ( pos >= j*cellHeight && pos <= (j+1)*cellHeight )
		{
            return j;
        }
    }
    return;
}

function getPOS(e)
{
    var evt = e || window.event;
    mx = evt.pageX - ctx.canvas.offsetLeft;
    my = evt.pageY - ctx.canvas.offsetTop;
}
function getClick(e)
{
    var evt = e || window.event;
    mx = evt.pageX - ctx.canvas.offsetLeft;
    my = evt.pageY - ctx.canvas.offsetTop;
    clicked = true;
}
function stopClick()
{
    clicked = false;
}

canvasElement.addEventListener("mousemove", getPOS);
canvasElement.addEventListener("mousedown", getClick);
canvasElement.addEventListener("mouseup", stopClick);
canvasElement.addEventListener("mouseout", stopClick);
