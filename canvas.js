var canvas = document.querySelector('Canvas');
console.log(canvas);

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d');

// Class for the wave representing a nation's trajectory
function Wave(name, color, trajectory, speed){
    
    this.name   = name
    this.color  = color
    this.traj   = trajectory
    this.speed  = speed
    this.draw = function () {
        c.beginPath()
c.moveTo(0, canvas.height)
c.linewidth = 10
var startWave = (2 * canvas.height / 3)

for(let i = 0; i < canvas.width; i++){ 
    c.lineTo(i, (-slope * i) + startWave + 100 * Math.sin(.01 * i))
}

    }
    
        
}

var slope = 0.15
var axisWidth = 2
//x axis
c.beginPath()
c.moveTo(0, 2 * canvas.height / 3)
c.lineWidth = 1
c.lineTo(canvas.width, (- canvas.width * slope) + (2 * canvas.height / 3))
c.stroke();

// //bottom axis
// c.moveTo(0, 5 * canvas.height / 6)
// c.linewidth = 10
// c.lineTo(canvas.width, (- canvas.width * slope) + (5 * canvas.height / 6))
// c.stroke();

//y-axis
c.moveTo(271, canvas.height)
c.lineWidth = axisWidth
c.lineTo(271, 0)
c.stroke();

//z-axis
c.moveTo(0, canvas.height / 2)
c.linewidth = axisWidth
c.lineTo(canvas.width, (canvas.width * 3.75 * slope) + (2 * canvas.height / 3))
c.stroke();

//sine 
c.beginPath()
c.moveTo(0, canvas.height)
c.lineWidth = 10
c.color
var startWave = (7 * canvas.height / 10)

for(let i = 0; i < canvas.width; i++){ 
    c.lineTo(i, (-slope * i) + startWave + 100 * Math.sin(.01 * i))
}

c.stroke()





