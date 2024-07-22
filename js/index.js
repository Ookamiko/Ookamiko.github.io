const canvas = document.getElementById("test_canvas");
const ctx = canvas.getContext("2d");
const params = new URLSearchParams(window.location.search);

console.log(params);

const minSize = 10;
const maxSize = 100;
let circleSize = 50;

if (params.has('size')) {
	let newSize = Number(params.get('size'));

	if (newSize != Number.NaN) {
		circleSize = Math.min(maxSize, Math.max(minSize, newSize));
	}
}

const minNbr = 1;
const maxNbr = 10;
let nbrCircle = 5;

if (params.has('nbr')) {
	let newNbr = Number(params.get('nbr'));
	console.log(newNbr);
	if (newNbr != Number.NaN) {
		nbrCircle = Math.min(maxNbr, Math.max(minNbr, newNbr));
	}
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	circles.forEach(c => {
		c.x = canvas.width / 2;
		c.y = canvas.height / 2;
	})
}

window.addEventListener('resize', resize);

canvas.addEventListener('click', function(event) {
	const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    circles.forEach(c => {
    	if(c.isClicked(mouseX, mouseY)) {
    		c.click();
    	}
    });
});

let circles = []
const colors = ['red', 'blue', 'green', 'yellow', 'lime', 'black', 'grey', 'cyan'];

while (circles.length < nbrCircle) {
	let tmp = new Circle(
			canvas.width / 2,
			canvas.height / 2,
			circleSize,
			Math.random() * 2 * (Math.random() < 0.5 ? -1 : 1),
			Math.random() * 2 * (Math.random() < 0.5 ? -1 : 1),			
			colors[Math.floor(Math.random() * colors.length)]
		)

	tmp.nextStep = function() {
		this.x += this.vx;
		this.y += this.vy;

		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.vx = -this.vx;
		}

		if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
			this.vy = -this.vy;
		}
	}

	tmp.click = function() {
		let newcolor = colors[Math.floor(Math.random() * colors.length)];
		while(this.color == newcolor) {
			newcolor = colors[Math.floor(Math.random() * colors.length)];
		}
		this.color = newcolor;
	}

	circles[circles.length] = tmp;
}

function draw() {
	// Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a circle
    circles.forEach(c => {
    	c.draw(ctx);
    	c.nextStep();
    });
}

function animate() {
	requestAnimationFrame(animate);
	draw();
}

resize();
animate();