var layer1 = document.getElementById('layer1');
var layer2 = document.getElementById('layer2');

const width = 1302;
const height = 744;

layer1.width = width; //Givners screen is 1302 x 744
layer1.height = height;
layer2.width = width;
layer2.height = height;

var c1 = layer1.getContext('2d');
var c2 = layer2.getContext('2d');
var zoom = false;
var slope = 0.15;
var zoomedLineWidth = 10;

// Class for the wave representing a nation's trajectory
function Wave(name, color, slope, amp) {
	this.name = name;
	this.color = color;

	this.slope = slope; // slope for 3d perspective
	this.amp = amp; // amplitude
	this.startWave = 7 * layer1.height / 10; // starting height of the wave
	this.wavelength = -0.02;
	this.frequency = 0.01; //incrementer in animation

	this.draw = function() {
		c2.beginPath();
		c2.moveTo(0, layer2.height / 2);

		for (let i = 1; i < layer2.width; i++) {
			//Sine Wave = slope W.R.T. x-position(height increases left -> right)
			//          + Starting height
			//          + amplitude / cubed root of x-position(decreasing amplitude left -> right)
			//          * sine function of (horizontal shrink of cons + frequency)
			//            reference:
			//              c1.lineTo(i, (-slope * i) + startWave + (500 / (Math.cbrt(i))) * Math.sin(.02 * i + .frequency))

			c2.lineTo(
				i,
				-slope * i + this.startWave + this.amp / Math.cbrt(i) * Math.sin(this.wavelength * i + this.frequency)
			);
		}

		c2.strokeStyle = 'hsl(255, 50%, 50%)';
		c2.stroke();
	};
}

function XZaxis(slope, isZ) {
	//slope is currently .15
	this.slope = slope;
	var movTo = 2 / 3;
	var linTo = -1 * slope;
	if (isZ) {
		movTo = 0.5;
		linTo = 1.8 * slope;
	}

	this.draw = function() {
		c1.beginPath();
		c1.moveTo(0, movTo * layer1.height);
		c1.lineWidth = 1;
		c1.lineTo(layer1.width, linTo * layer1.width + 2 * layer1.height / 3);
		c1.strokeStyle = 'red';
		c1.stroke();
	};
	this.updateZ = function() {
		this.draw();
		movTo += 0.0006;
		linTo += 0.0006;
	};
}
function Yaxis(x) {
	//240
	this.x = x;
	this.draw = function() {
		c1.moveTo(this.x, layer1.height);
		c1.lineWidth = 1;
		c1.lineTo(this.x, 0);
		c1.strokeStyle = 'red';
		c1.stroke();
	};
	this.update = function() {
		this.draw();
		this.x--;
	};
}

function cWheel(x, y, isLeft) {
	this.x = x;
	this.y = y;

	this.draw = function(ctx, zoom) {
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.ellipse(this.x, this.y, 60, 120, Math.PI, Math.PI / 2, 3 * Math.PI / 2, isLeft);
		ctx.lineWidth = 100;
		ctx.fillStyle = 'ivory';
		ctx.fill();
	};

	this.update = function(ctx) {
		ctx.moveTo(this.x, this.y);
		dx = 0.1;
		dy = 0.01118033;
		ctx.ellipse(this.x, this.y, 60, 120, Math.PI, Math.PI / 2, 3 * Math.PI / 2, isLeft);
		if (this.x < 1000) {
			//So it stops at 1000 and doesnt go off screen
			this.x += dx;
			this.y -= dy;
		}
		if (!zoom) {
			ctx.fillStyle = 'lightBlue';
			ctx.fill();
		}
	};
}

colorArray = [
	'red',
	'blue',
	'green',
	'yellow',
	'purple',
	'orange',
	'pink',
	'brown',
	'grey',
	'ivory',
	'lightBlue',
	'darkSeaGreen'
];

function tribe(y, color, width) {
	this.topLineY = y;
	this.color = color;
	this.tribes = [];
	this.draw = function() {
		newTribe = new Wave('name', color, slope, 500);
		c2.lineWidth = width;
		newTribe.draw();
	};
}

//zooming in functions
var intervalID = 0;
function increase() {
	zoom = true;
	clearInterval(intervalID);
	intervalID = setInterval(expand, 100);
}

function decrease() {
	clearInterval(intervalID);
	intervalID = setInterval(shrink, 100);
}

function expand() {
	if (zoomedLineWidth < height + 100) {
		paused = false;
		zoomedLineWidth += 100;
	} else {
		clearInterval(intervalID);
		paused = true;
	}
}

function shrink() {
	paused = false;
	if (zoomedLineWidth > 10) {
		zoomedLineWidth -= 100;
	} else {
		clearInterval(intervalID);
		zoom = false;
	}
}

function sineZoomIn() {
	var diff = 2;
	if (c2.lineWidth < 20) {
		c2.lineWidth += diff;
	} else {
		clearInterval(intervalID);
	}
}

//animation
sine = new Wave('Israel', 'pink', slope, 500);

xAxis = new XZaxis(slope, false);
zAxis = new XZaxis(slope, true);
yAxis = new Yaxis(240);

leftcwheel = new cWheel(300, 450, true);
rightcwheel = new cWheel(300, 450, false);

c1.strokeStyle = 'pink';

zAxis.draw();
var paused = false;

var y = 0;
function animate() {
	requestAnimationFrame(animate);
	c2.beginPath();
	c2.rect(0, 0, layer2.width, layer2.height / 12);
	c2.lineWidth = 62;
	c2.fillStyle = 'orange';
	c2.fill();
	c2.fillText('Hello World', 10, 62);
	if (!paused) {
		c1.clearRect(0, 0, layer1.width, layer1.height);
		//c2.fillStyle = 'rgba(0,0,0, 0.01)';
		c2.clearRect(0, 0, layer1.width, layer1.height);

		//axes (go on layer1)
		leftcwheel.update(c1);
		xAxis.draw();
		yAxis.update();
		zAxis.updateZ();
		c2.lineWidth = zoomedLineWidth;

		// sine wave(goes on layer2)
		sine.draw();

		c2.strokeStyle = 'hsl(255, 50%, 50%)';
		c2.stroke();

		c2.beginPath();
		rightcwheel.update(c2);
		sine.frequency += 0.01;
	} else {
		console.log('paused');
	}
}
animate();

function makeTwelve() {
	for (let i = 0; i < 12; i++) {
		tribe(y, colorArray[i]);
		y += 62;
	}
	y = 0;
	console.log('look at me');
}
