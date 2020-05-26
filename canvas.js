var layer1 = document.getElementById("layer1");
var layer2 = document.getElementById("layer2");

const  width = 1302
const  height = 744;

layer1.width = width; //Givners screen is 1302 x 744
layer1.height = height;

var c = layer1.getContext('2d');
var slope = 0.15;
var lineWidth = 2;

// Class for the wave representing a nation's trajectory
function Wave(name, color, slope, amp) {
	this.name = name;
	this.color = color;

	this.slope = slope; // slope for 3d perspective
	this.amp = amp; // amplitude
	this.startWave = 7 * layer1.height / 10; // starting height of the wave
	this.wavelength = -0.02;
	this.frequency = 0.01; //incrementer in animation

	// this.draw = function() {
	// 	c.beginPath();
	// 	c.moveTo(0, layer1.height);
	// 	c.lineWidth = 10;
	// 	for (let i = 0; i < layer1.width; i++) {
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
		c.moveTo(0, movTo * layer1.height);
		c.lineWidth = 1;
		c.lineTo(layer1.width, linTo * layer1.width + 2 * layer1.height / 3);
		c.strokeStyle = 'red';
		c.stroke();
	};
	this.updateZ = function(){
		this.draw();
		movTo += .0006;
		linTo += .0006;
	}
}
function Yaxis(x){ //240
	this.x = x;
	this.draw = function() {
		c.moveTo(this.x, layer1.height);
		c.lineWidth = 1;
		c.lineTo(this.x, 0);
		c.strokeStyle = 'red';
		c.stroke();
	}
	this.update = function(){
		this.draw()
		this.x--
	}
}
	

function cWheel(x, y, isLeft) {
	this.x = x;
	this.y = y;

	this.draw = function() {
		c.beginPath();
		c.moveTo(this.x, this.y)
		c.ellipse(this.x, this.y, 60, 120, Math.PI, Math.PI / 2, 3 * Math.PI / 2, isLeft)	
		c.lineWidth = 100;
		c.fillStyle = 'yellow';
		c.fill();
	};

	this.update = function() {
		c.moveTo(this.x, this.y)
		dx = 0.1;
		dy = 0.01118033;
		c.ellipse(this.x, this.y, 60, 120, Math.PI, Math.PI / 2, 3 * Math.PI / 2, isLeft)
		this.x += dx;
		this.y -= dy;
		if(this.x >= 1000){
			this.x -= dx
			this.y += dy
		}
		c.fillStyle = 'yellow';
		c.fill();
	};
}

sine = new Wave('boner', 'purple', slope, 500);

xAxis = new XZaxis(slope, false);
zAxis = new XZaxis(slope, true);
yAxis = new Yaxis(240);

leftcwheel = new cWheel(300, 450, true);
rightcwheel = new cWheel(300, 450, false);
 

c.strokeStyle = 'purple';

zAxis.draw();

function animate() {
	requestAnimationFrame(animate);
	
	
	c.clearRect(0, 0, layer1.width, layer1.height);
	xAxis.draw();
	yAxis.update();
	leftcwheel.update()
	zAxis.updateZ();
	c.beginPath();
	c.moveTo(0, layer1.height / 2);
	c.lineWidth = 10;

	for (let i = 1; i < layer1.width; i++) {
		//Sine Wave = slope W.R.T. x-position(height increases left -> right)
		//          + Starting height
		//          + amplitude / cubed root of x-position(decreasing amplitude left -> right)
		//          * sine function of (horizontal shrink of cons + frequency)
		//            reference:
		//              c.lineTo(i, (-slope * i) + startWave + (500 / (Math.cbrt(i))) * Math.sin(.02 * i + .frequency))

		c.lineTo(i,-slope * i + sine.startWave + sine.amp / Math.cbrt(i) * Math.sin(sine.wavelength * i + sine.frequency)
		);
	}
	c.strokeStyle = 'hsl(255, 50%, 50%)';
	c.stroke();

	c.beginPath();
	rightcwheel.update()
	sine.frequency += 0.01;

}

animate();
