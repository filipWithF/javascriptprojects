const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined
}

addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    init();
});

var colorArray = [
    '#23A4CC',
    '#819399',
    '#70FFD2',
    '#FFV5B0',
    '#CC456C'
];

var maxVelocity = 0.5;

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    };

    this.update = function() {

        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            this.x = mouse.x - 100;
            this.y = mouse.y - 100;
        } 

        this.draw();
    };
}

var arrayOfCircles;

function init() {
    
    arrayOfCircles = [];

    for (let i = 0; i < 1000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const dx = Math.random() - 0.5;
        const dy = Math.random() - 0.5;
        const radius = Math.random() * 5;
        arrayOfCircles.push(new Circle(x, y, dx, dy, radius));
    }

}

function animate(){
    requestAnimationFrame(animate) 
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < arrayOfCircles.length; index++) {
        arrayOfCircles[index].update();
    }
}

init();
animate();

