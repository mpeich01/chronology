var canvas = document.querySelector('Canvas');
console.log(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var slope = 0.15;
var lineWidth = 2;

// Class for the wave representing a nation's trajectory
function Wave(name, color, slope, amp) {
	this.name = name;
	this.color = color;

	this.slope = slope; // slope for 3d perspective
	this.amp = amp; // amplitude
	this.startWave = 7 * canvas.height / 10; // starting height of the wave
	this.wavelength = -0.02;
	this.frequency = 0.01; //incrementer in animation

	// this.draw = function() {
	// 	c.beginPath();
	// 	c.moveTo(0, canvas.height);
	// 	c.lineWidth = 10;
	// 	for (let i = 0; i < canvas.width; i++) {
	// 		//Sine Wave = slope W.R.T. x-position(height increases left -> right)
	// 		//          + Starting height
	// 		//          + amplitude / cubed root of x-position(decreasing amplitude left -> right)
	// 		//          * sine function of (horizontal shrink of cons + frequency)
	// 		//            reference:
	// 		//              c.lineTo(i, (-slope * i) + startWave + (500 / (Math.cbrt(i))) * Math.sin(.02 * i + .frequency))

	// 		c.lineTo(i, -slope * i + this.startWave + amp / Math.cbrt(i) * Math.sin(wavelength * i));
	// 		c.strokeStyle = color;
	// 		c.stroke();
	// 		this.frequency += this.frequency;
	// 	}
	// }
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
		c.beginPath();
		c.moveTo(0, movTo * canvas.height);
		c.lineWidth = 1;
		c.lineTo(canvas.width, linTo * canvas.width + 2 * canvas.height / 3);
		c.strokeStyle = 'red';
		c.stroke();
	};
}

function Yaxis() {
	c.moveTo(240, canvas.height);
	c.lineWidth = 1;
	c.lineTo(240, 0);
	c.strokeStyle = 'red';
	c.stroke();
}

function cWheel(x, y) {
	this.x = x;
	this.y = y;

	this.draw = function() {
		c.beginPath();
		c.ellipse(this.x, this.y, 60, 120, Math.PI, 0, 2 * Math.PI, false);
		c.lineWidth = 10;
		c.strokeStyle = 'black';
		c.stroke();
		c.fillStyle = 'yellow';
		c.fill();
	};

	this.update = function() {
		dx = 0.1;
		dy = 0.1118033;
		c.ellipse(this.x, this.y, 60, 120, Math.PI, 0, 2 * Math.PI, false);
		this.x += dx;
		this.y += dy;
	};
}

sine = new Wave('boner', 'purple', slope, 500);
xAxis = new XZaxis(slope, false);
zAxis = new XZaxis(slope, true);

c.strokeStyle = 'purple';
function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(0,0,0,0.01)';

	c.fillRect(0, 0, canvas.width, canvas.height);

	xAxis.draw();
	zAxis.draw();
	Yaxis();
	cWheel(300, 450, slope);

	c.beginPath();
	c.moveTo(0, canvas.height / 2);
	c.lineWidth = 10;

	for (let i = 1; i < canvas.width; i++) {
		//Sine Wave = slope W.R.T. x-position(height increases left -> right)
		//          + Starting height
		//          + amplitude / cubed root of x-position(decreasing amplitude left -> right)
		//          * sine function of (horizontal shrink of cons + frequency)
		//            reference:
		//              c.lineTo(i, (-slope * i) + startWave + (500 / (Math.cbrt(i))) * Math.sin(.02 * i + .frequency))

		c.lineTo(
			i,
			-slope * i + sine.startWave + sine.amp / Math.cbrt(i) * Math.sin(sine.wavelength * i + sine.frequency)
		);
	}
	c.strokeStyle = 'hsl(255, 50%, 50%)';
	c.stroke();
	sine.frequency += 0.01;
}

animate();
