var width = 800;
var height = 600;
var FPS = 60;

var canvasElement = document.getElementById('canvas');
canvasElement.width = width;
canvasElement.height = height;
var ctx = canvasElement;

var map = [];
var cellWidth = 16;//made the cells fit the canvas
var cellHeight = 12;

if(canvasElement.getContext)
{
	ctx = canvasElement.getContext("2d");

	setInterval(function() {
		update();
		draw();
	}, 1000/FPS);
}
else { alert("Your browser doesn't support <canvas>."); }

function createWorld(x, y)
{
	for(var i=0; i<x; i++)
	{
		map[i] = [];
		for(var j=0; j<y; j++)
		{
			map[i][j] = Math.round(Math.random()*1);
			console.log("val " + j + ": " + map[i][j]);
		}
	}
}

createWorld(50, 50);

function update()
{
	
}

function draw()
{
	ctx.clearRect(0, 0, width, height);
	
	for(var i=0; i<map.length; i++)
	{
		for(var j=0; j<map[i].length; j++)
		{
			if(map[i][j] == 0) { ctx.fillStyle = "white"; }
			else if(map[i][j] == 1) { ctx.fillStyle = "black"; }
			else if(map[i][j] == 3) { ctx.fillStyle = "green"; }//added green to tell where i clicked
			ctx.fillRect(i*cellWidth, j*cellHeight, cellWidth, cellHeight);
		}
	}
}
function getMapX(pos){
	for(var i=0; i<map.length; i++){
		if ( pos >= i*cellWidth && pos <= (i+1)*cellWidth ){
			return i;
		}
	}
	return;
}
function getMapY(pos){
	for(var j=0; j<map.length; j++){
		if ( pos >= j*cellHeight && pos <= (j+1)*cellHeight ){
			return j;
		}
	}
	return;
}

function getClick(e)
{
	var evt = e || window.event;
	mx = evt.pageX - 8;//these needed to be offset it's checking the page x and y not the canvas
	my = evt.pageY - 8;
	clicked = true;
	map[getMapX(mx)][getMapY(my)] = 3;//sets where you clicked to 3 "green"
}

canvasElement.addEventListener("mousedown", getClick);
