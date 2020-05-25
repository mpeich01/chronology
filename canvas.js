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

c.beginPath()
c.moveTo(100, 900)
c.lineTo(800, 200)
c.stroke()



