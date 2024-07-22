const canvas = document.getElementById("test_canvas");
const ctx = canvas.getContext("2d");
const circleSize = 20;
const assetSize = 15;
const file = new Image(128,64);
file.src = "./snake.png"

canvas.addEventListener('click', function(event) {
	const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    console.log(event);
    console.log(rect);

    circles.forEach(c => {
    	if(c.isClicked(mouseX, mouseY)) {
    		c.click();
    	}
    });
});

function Circle(x, y, dx, dy, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.color = color;
}

Circle.prototype.draw = function() {
	ctx.beginPath();
    ctx.arc(this.x, this.y, circleSize, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
}

Circle.prototype.nextStep = function () {
	this.oldx = this.x;
	this.oldy = this.y;
	this.x += this.dx;
	this.y += this.dy;

	if (this.x + assetSize > canvas.width || this.x - assetSize < 0) {
		this.dx = -this.dx;
	}

	if (this.y + assetSize > canvas.height || this.y - assetSize < 0) {
		this.dy = -this.dy;
	}
}

Circle.prototype.isClicked = function(x, y) {
	return Math.hypot(this.x - x, this.y - y) < circleSize;
}

Circle.prototype.click = function() {
	console.log("here");
	this.color = 'lime';
}

let circles = []

for (let i = 0 ; i < 5 ; i++) {
	circles[circles.length] = new Circle(
			canvas.width / 2,
			canvas.height / 2,
			Math.random() * 2 * (Math.random() < 0.5 ? -1 : 1),
			Math.random() * 2 * (Math.random() < 0.5 ? -1 : 1),			
			'blue'
		)
}

function draw() {
	// Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a circle
    circles.forEach(c => {
    	c.draw();
    	c.nextStep();
    });
}

function animate() {
	requestAnimationFrame(animate);
	draw();
}

animate();