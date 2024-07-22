function Circle(x, y, radius, vx, vy, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.vx = vx;
	this.vy = vy;
	this.color = color;
	this.showVector = false;
}

Circle.prototype.draw = function(ctx2d) {
	ctx2d.save();
	ctx2d.translate(this.x, this.y);

	ctx2d.beginPath();
	ctx2d.arc(0, 0, this.radius, 0, Math.PI * 2, false);
	ctx2d.fillStyle = this.color;
	ctx2d.fill();
	ctx2d.closePath();

	if (this.showVector) {
		let angle = Math.atan2(this.vy, this.vx);

		ctx2d.rotate(angle);

		ctx2d.beginPath();
		ctx2d.moveTo(0, 0);
		ctx2d.lineTo(40, 0);
		ctx2d.lineTo(35, 5);
		ctx2d.lineTo(40, 0);
		ctx2d.lineTo(35, -5);
		ctx2d.stroke();
		ctx2d.closePath();
	}

	ctx2d.restore();
}

Circle.prototype.isClicked = function(x, y) {
	return Math.hypot(this.x - x, this.y - y) < circleSize;
}