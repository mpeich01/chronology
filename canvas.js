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
    
    
}
var slope = 0.1

//t axis
c.beginPath()
c.moveTo(0, 2 * canvas.height / 3)
c.linewidth = 10
c.lineTo(canvas.width, (- canvas.width * slope) + (2 * canvas.height / 3))
c.stroke();

//bottom axis
c.moveTo(0, 5 * canvas.height / 6)
c.linewidth = 10
c.lineTo(canvas.width, (- canvas.width * slope) + (5 * canvas.height / 6))
c.stroke();

//y-axis
c.moveTo(150 + (slope * canvas.height), canvas.height)
c.linewidth = 10
c.lineTo(150, 0)
c.stroke();

//sine 
c.beginPath()
c.moveTo(0, canvas.height)
c.linewidth = 10
var startWave = (2 * canvas.height / 3)

for(let i = 0; i < canvas.width; i++){ 
    c.lineTo(i, (-slope * i) + startWave + 100 * Math.sin(.01 * i))
}

c.stroke()





