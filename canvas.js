var canvas = document.querySelector('Canvas');
console.log(canvas);

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d');
var slope = .15
var lineWidth = 2;

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

function XZaxis(slope, isZ){ //.15

    this.slope = slope
    var movTo = 2/3
    var linTo = -1 * slope
    if(isZ){
        movTo = .5
        linTo = 1.8 * slope 
    }

    this.draw = function() { 
        c.beginPath()
        c.moveTo(0,  movTo * canvas.height)
        c.lineWidth = 1
        c.lineTo(canvas.width, ((linTo) * canvas.width) + (2 * canvas.height / 3))
        c.strokeStyle = 'red'
        c.stroke();
    }
}

    xAxis = new XZaxis(slope, false);
    xAxis.draw();
    zAxis = new XZaxis(slope, true);
    zAxis.draw()
//xaxis
    // this.draw = function(){   
    //     c.beginPath()
    //     c.moveTo(0, (2/3) * canvas.height)
    //     c.lineWidth = 1
    //     c.lineTo(canvas.width, ((-1 * slope) * canvas.width) + (2 * canvas.height / 3))
    //     c.strokeStyle = 'red'
    //     c.stroke();
    // }


// function Zaxis(slope){ // slope = .15
//     this.draw = function(){
//         c.moveTo(0, canvas.height / 2)
//         c.linewidth = lineWidth
//         c.lineTo(canvas.width, (canvas.width * 1.8 * slope) + (2 * canvas.height / 3))
//         c.strokeStyle = 'red'
//         c.stroke();     
//     }
// }


// //z-axis
// c.moveTo(0, canvas.height / 2)
// c.linewidth = lineWidth
// c.lineTo(canvas.width, (canvas.width * 1.8 * slope) + (2 * canvas.height / 3))
// c.strokeStyle = 'red'
// c.stroke();

// //bottom axis
c.beginPath()
c.moveTo(0, (2 * (canvas.height / 3)) - 120)
c.lineWidth = 1
c.lineTo(canvas.width, (- canvas.width * slope) + ((2 * canvas.height / 3) - 120))
c.strokeStyle = 'red'
c.stroke();

//Top Axis
c.beginPath()
c.moveTo(0, (2 * (canvas.height / 3)) + 120)
c.lineWidth = 1
c.lineTo(canvas.width, (- canvas.width * slope) + ((2 * canvas.height / 3) + 120))
c.strokeStyle = 'red'
c.stroke();

//y-axis
c.moveTo(271, canvas.height)
c.lineWidth = 1
c.lineTo(271, 0)
c.strokeStyle = 'red'
c.stroke();


//sine 
c.beginPath()
c.moveTo(0, canvas.height)
c.lineWidth = 10
c.color
var startWave = (7 * canvas.height / 10)

for(let i = 1; i < canvas.width; i++){ 
    //Sine Wave = slope W.R.T. x-position(height increases left -> right)
    //          + Starting height
    //          + amplitude / cubed root of x-position(decreasing amplitude left -> right)
    //          * sine function of (horizontal shrink of cons)
    //            reference:  
    //              c.lineTo(i, (-slope * i) + startWave + (500 / (Math.cbrt(i))) * Math.sin(.02 * i))

    c.lineTo(i, (-slope * i) + startWave + (500 / (Math.cbrt(i))) * Math.sin(.02 * i))
}
c.strokeStyle = 'purple'
c.stroke()

//cWheel
c.beginPath()
c.ellipse(300, 450, 80, 120, (Math.PI), 0, 2 * Math.PI, false)
c.lineWidth = 10
c.strokeStyle = 'black'
c.stroke()
c.fillStyle = 'yellow'
c.fill()





