var width = 800;
var height = 600;
var FPS = 60;

var canvasElement = document.getElementById('canvas');
canvasElement.width = width;
canvasElement.height = height;
var ctx = canvasElement;

if(canvasElement.getContext)
{
	ctx = canvasElement.getContext("2d");

	setInterval(function() {
		update();
		draw();
	}, 1000/FPS);
}
else { alert("Your browser doesn't support <canvas>."); }

function update()
{
}


function draw()
{
	ctx.clearRect(0, 0, width, height);
}

function getClick(e)
{
	var evt = e || window.event;
	var mx = evt.pageX;
	var my = evt.pageY;
	clicked = true;
}

canvasElement.addEventListner("mousedown", getClick);
