var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


const circleColor = 'rgba(0, 0, 100, .5)';
const nCircles = 500;
const velConst = 1;
const g = 0.01;
const mouseCloseness = 50;
const radius = 10;
const maxRadius = 40;
const minRadius = 2;

const colorArray = [
    '#eb73df',
    '#6ee4ff',
    '#fffd6e',
    '#abfc68'
]

var mouse = {
    x: undefined,
    y: undefined
}

var click = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
});

window.addEventListener('click', function(event) {
    

}


window.addEventListener('resize', 
    function(event) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initCircles(nCircles);
    })

function Circle(x, y, r, dx=0, dy=0) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.minRadius = r;
    this.dx = dx;
    this.dy = dx;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    console.log(this.color);

    this.density = 1;
    this.area = Math.PI * this.radius**2;
    this.mass = this.density * this.area; 
    
    this.setVelocity = function(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }

    this.launchRandom = function() {
        this.setVelocity(Math.random()*3, Math.random()*3);
    }

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function() {
        this.x += this.dx;
        this.dy += g;
        this.y += this.dy;
        
        if (this.x + this.radius >= canvas.width) {
            this.x = canvas.width - this.radius - 1;
            this.dx *= -1
        }
        if (this.x - this.radius <= 0) {
            this.x = this.radius + 1;
            this.dx *= -1
        }   
    
        if (this.y + this.radius >= canvas.height) {
            this.y = canvas.height - this.radius - 1;
            this.dy *= -1
        }
        if (this.y - this.radius <= 0) {
            this.y = this.radius + 1;
            this.dy *= -1
        } 
        
        // interactivity
        if (Math.abs(mouse.x - this.x) < mouseCloseness && 
            Math.abs(mouse.y - this.y) < mouseCloseness) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
    }
}

function Vector(x, y) {
    this.x = x;
    this.y = y;

    this.scalarMult = function(s) {
        return Vector(s*this.x, s*this.y);
    }

    this.dotProduct = function(v) {
        return this.x*v.x + this.y*v.y;
    }
    
    this.length = function() {
        return Math.sqrt((this.x**2 + this.y**2));
    }
    this.cosTheta(v) = function() {
        return this.dotProduct(v) / (this.length() * v.length())
    }
}

function randomX() {
    return radius + Math.random()*(canvas.width - 2*radius);
}

function randomY() {
    return radius + Math.random()*(canvas.height - 2*radius);
}

function randomVel() {
    return velConst * (-1 + 2*Math.random())
}

function randomRadius() {
    return minRadius + radius*Math.random();
}

function initCircles(n) {
    circles = [];
    for (var i = 0; i < n; i++) {
        circles.push(new Circle(randomX(), randomY(), randomRadius(), randomVel(), randomVel()));
    }
    return circles;
}


var circles = initCircles(nCircles);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    for (var i = 0; i < circles.length; i++) {
        circles[i].draw();
    }
    for (var i = 0; i < circles.length; i++) {
        circles[i].update();
    }

}

animate();


// For reference:

// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillRect(50, 200, 30, 40);

// // Line
// c.beginPath();
// c.moveTo(50, 300); 
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "blue";
// c.stroke();

// // arc or circle
// c.beginPath();
// c.arc(300,300, 30, 0, Math.PI *2, false);
// c.stroke();