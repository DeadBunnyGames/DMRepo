var width;
var height;
var FPS = 60;

var canvasElement = document.getElementById('canvas');
var ctx = canvasElement;

var map = [];
var menuBar = [];
var menuBarText = [];
var cellWidth = 15;//made the cells fit the canvas
var cellHeight = 15;
var HQSize = 4;
var clicked = false;
var mx = 0;
var my = 0;
var TextSpacing = 150;
var Drawing = "Floor";

var BackLeft = new Image();
BackLeft.src = "src/BackLeft.png";
var BackRight = new Image();
BackRight.src = "src/BackRight.png";
var BackWall = new Image();
BackWall.src = "src/BackWall.png";

var FrontLeft = new Image();
FrontLeft.src = "src/FrontLeft.png";
var FrontRight = new Image();
FrontRight.src = "src/FrontRight.png";
var FrontWall = new Image();
FrontWall.src = "src/FrontWall.png";

var LeftWall = new Image();
LeftWall.src = "src/LeftWall.png";
var RightWall = new Image();
RightWall.src = "src/RightWall.png";

var Floor = new Image();
Floor.src = "src/Floor.png";
var DoorWay = new Image();
DoorWay.src = "src/DoorWay.png";

var Rock = new Image();
Rock.src = "src/Rock.png";

if(canvasElement.getContext)
{
    ctx = canvasElement.getContext("2d");

    setInterval(function() {
        update();
        draw();
    }, 1000/FPS);
}
else { alert("Your browser doesn't support <canvas>."); }

function Menu(x, y, width, height, items)
{
	var list = {};
	
	list.x = x;
	list.y = y;
	list.width = width;
	list.height = height;
	list.items = items;
	
	list.changeItem = function(index, value)
	{
		items[index] = value;
	}
	
	return list;
}

function createMenu()
{
	menuBar[0] = new Menu(0, width, height-200, 200, ["Construction", "Suck It"]);
	menuBar[0][0] = new Menu(10, 170, height-170, 130, ["Traps", "Monsters", "Building", "Sell", "Back"]);
	menuBar[0][1] = new Menu(10, 170, height-170, 130, ["Penis", "Pickle"]);
}

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
			{
				if((i>=(x/2)-(HQSize/2) && i<=(x/2)+((HQSize/2)-HQSize)) && (j>=(y/2)-(HQSize/2) && j<=(y/2)+((HQSize/2)-HQSize)))
					map[i][j] = new Cell(i, j, "BackLeft", true);
				else if((i>=(x/2)-((HQSize/2)-HQSize) && i<=(x/2)+(HQSize/2)) && (j>=(y/2)-(HQSize/2) && j<=(y/2)+((HQSize/2)-HQSize)))
					map[i][j] = new Cell(i, j, "BackRight", true);
				else if((i>=(x/2)-((HQSize/2)-HQSize) && i<=(x/2)+(HQSize/2)) && (j>=(y/2)-((HQSize/2)-HQSize) && j<=(y/2)+(HQSize/2)))
					map[i][j] = new Cell(i, j, "FrontRight", true);
				else if((i>=(x/2)-(HQSize/2) && i<=(x/2)+((HQSize/2)-HQSize)) && (j>=(y/2)-((HQSize/2)-HQSize) && j<=(y/2)+(HQSize/2)))
					map[i][j] = new Cell(i, j, "FrontLeft", true);
				else if((i>=(x/2)-(HQSize/2) && i<=(x/2)+(HQSize/2)) && (j>=(y/2)-(HQSize/2) && j<=(y/2)+((HQSize/2)-HQSize)))
					map[i][j] = new Cell(i, j, "BackWall", true);
				else if((i>=(x/2)-(HQSize/2) && i<=(x/2)+(HQSize/2)) && (j>=(y/2)-((HQSize/2)-HQSize) && j<=(y/2)+(HQSize/2)))
					map[i][j] = new Cell(i, j, "FrontWall", true);
				else if((i>=(x/2)-(HQSize/2) && i<=(x/2)+((HQSize/2)-HQSize)) && (j>=(y/2)-(HQSize/2) && j<=(y/2)+(HQSize/2)))
					map[i][j] = new Cell(i, j, "LeftWall", true);
				else if((i>=(x/2)-((HQSize/2)-HQSize) && i<=(x/2)+(HQSize/2)) && (j>=(y/2)-(HQSize/2) && j<=(y/2)+(HQSize/2)))
					map[i][j] = new Cell(i, j, "RightWall", true);
				else
					map[i][j] = new Cell(i, j, "Floor", false);
			}
            else //Blackness
                map[i][j] = new Cell(i, j, "Rock", true);
        }
    }
}

createWorld(50, 50);

width = map.length * cellWidth;
height = map[0].length * cellHeight + 200;

canvasElement.width = width;
canvasElement.height = height;

createMenu();
for(var i=0; i< menuBar[0].items.length; i++)
	menuBarText[i] = menuBar[0].items[i];

function update()
{
    if(clicked == true)
    {
		if(my < height-200)
		{
			if(map[getMapX(mx)][getMapY(my)].type == "Rock")//To Prevent "re-colouring"
			{
				map[getMapX(mx)][getMapY(my)].type = Drawing;
			}
		}
    }
}

function draw()
{
    ctx.clearRect(0, 0, width, height);
    
	ctx.fillStyle = "blue";
	ctx.fillRect(menuBar[0].x, menuBar[0].y, menuBar[0].width, menuBar[0].height);
	ctx.fillStyle = "black";
	ctx.font="20px Consolas";

	if(menuBarText.length >= 4)
	{
		ctx.font="15px Consolas";
		TextSpacing = 125;
	}
	for(var i=0; i<menuBarText.length; i++)
		ctx.fillText(menuBarText[i], menuBar[0].x+20 + (TextSpacing)*i, menuBar[0].y+100);
	
    for(var i=0; i<map.length; i++)
    {
        for(var j=0; j<map[i].length; j++)
        {
            if(map[i][j].type == "Rock") { source = Rock; }
            else if(map[i][j].type == "BackLeft") { source = BackLeft; }
            else if(map[i][j].type == "BackRight") { source = BackRight; }
			else if(map[i][j].type == "BackWall") { source = BackWall; }
			else if(map[i][j].type == "FrontLeft") { source = FrontLeft; }
            else if(map[i][j].type == "FrontRight") { source = FrontRight; }
			else if(map[i][j].type == "FrontWall") { source = FrontWall; }
			else if(map[i][j].type == "LeftWall") { source = LeftWall; }
			else if(map[i][j].type == "RightWall") { source = RightWall; }
			else if(map[i][j].type == "Floor") { source = Floor; }
			else if(map[i][j].type == "DoorWay") { source = DoorWay; }
            
            ctx.drawImage(source, i*cellWidth, j*cellHeight);
        }
    }
}
function getMapX(pos)
{
    for(var i=0; i<map.length; i++)
	{
        if ( pos >= i*cellWidth && pos <= (i+1)*cellWidth )
		{
            return i;
        }
    }
    return;
}

function getMapY(pos)
{
	if(pos < height - 200)
	{
		for(var j=0; j<map.length; j++)
		{
			if ( pos >= j*cellHeight && pos <= (j+1)*cellHeight )
			{
				return j;
			}
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

	//This is for the "Main" menu detection
	if(mx > menuBar[0].x && mx < menuBar[0].x + menuBar[0].width && my > menuBar[0].y && my < menuBar[0].y + menuBar[0].height)
	{
		if(menuBarText[0] == "Traps")
		{
			if(mx > menuBar[0].x && mx < menuBar[0].x+150 && my > menuBar[0].y && my < menuBar[0].y+200)
				Drawing = "FrontWall";
			else if(mx > menuBar[0].x+150 && mx < menuBar[0].x + (150*2) && my > menuBar[0].y && my < menuBar[0].y+200)
				Drawing = "BackWall";
		}
	
		else if(mx > menuBar[0].x && mx < menuBar[0].x + 150 && my > menuBar[0].y && my < menuBar[0].y+200)
		{
			for(var i=0; i<menuBar[0][0].items.length; i++)
			{
				menuBarText[i] = menuBar[0][0].items[i];
			}
		}
		else if(mx > menuBar[0].x && mx < menuBar[0].x + (150*2) && my > menuBar[0].y && my < menuBar[0].y+200)
		{
			for(var i=0; i<menuBar[0][1].items.length; i++)
			{
				menuBarText[i] = menuBar[0][1].items[i];
			}
		}
	}

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
