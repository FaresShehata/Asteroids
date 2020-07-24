class Ship extends Game {

  constructor() {
    super(
      createVector(width / 2, height / 2),
      createVector(0, 0),
      10);
    this.acc = createVector(0, 0);
    this.moving = false;
    this.direction = -HALF_PI;
    this.bullets = [];
  }

  move() {
    if (!this.moving) {
      this.acc.set(0, 0);
      this.vel.mult(0.98);
      if (this.vel.mag() < 0.05) this.vel.set(0, 0);
    } else {
      this.acc = p5.Vector.fromAngle(this.direction, shipAcc);
      if (frameCount % 2 == 0) thrustSound.play();
    }

    if (this.pos.x + this.r < 0) this.pos.x = width;
    if (this.pos.x - this.r > width) this.pos.x = 0;
    if (this.pos.y + this.r < 0) this.pos.y = height;
    if (this.pos.y - this.r > height) this.pos.y = 0;

    this.vel.add(this.acc);
    if (this.vel.mag() > maxShipSpeed) {
      this.vel.setMag(maxShipSpeed);
    }
    this.pos.add(this.vel);
  }

  shoot() {
    const pos = this.pos.copy();
    const vel = p5.Vector.fromAngle(this.direction, bulletSpeed);
    this.bullets.push(new Bullet(pos, vel));
  }

  turn(d) {
    this.direction += 0.1 * d;
  }

  show() {
    fill(0);
    stroke(255);
    strokeWeight(1);

    push();

    translate(this.pos.x, this.pos.y);
    rotate(this.direction + HALF_PI);

    triangle(
      -this.r, +this.r,
      0, -this.r * 1.5,
      +this.r, +this.r);

    if (this.moving) {
      if (frameCount % 5 === 0) {
        triangle(
          -this.r * 0.6, +this.r,
          0, +this.r + 10,
          +this.r * 0.6, +this.r
        );
      }
    }

    // ellipse(0, 0, this.r * 2);

    pop();
  }
}