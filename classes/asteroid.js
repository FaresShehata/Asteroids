class Asteroid extends Game {

  constructor(pos, vel, size) {
    super(pos, vel, null);
    this.pos = pos;
    this.size = size;
    this.vel = vel;
    this.radii = this.randomRadii();
    this.r = this.averageRadius(this.radii);

    this.rotation = 0;
    this.rotationVel = (0.01 / this.size) * random([-1, 1]);
  }

  randomRadii() {
    const arr = [];
    for (let i = 0; i < floor(random(10, 12)); i++) {
      arr.push(random(3, 10) * this.size * 1.2);
    }
    return arr;
  }

  averageRadius(arr) {
    let sum = 0;
    for (let num of arr) sum += num;
    const average = sum / arr.length;

    return average;
  }

  split(bullet) {
    if (this.size == 1) return;
    const angle = bullet.vel.heading();
    const angle1 = angle + random(radians(20), radians(90)) * random([1, -1]);
    const angle2 = angle1 + PI;

    const speed = speedMultiplier / (this.size - 1);
    const v1 = p5.Vector.fromAngle(angle1, speed);
    const v2 = p5.Vector.fromAngle(angle2, speed);

    asteroids.push(
      new Asteroid(this.pos.copy(), v1, this.size - 1),
      new Asteroid(this.pos.copy(), v2, this.size - 1));
  }

  move() {
    this.pos.add(this.vel);
    this.rotation += this.rotationVel;
  }


  show() {
    push();

    stroke(255);
    strokeWeight(1);
    fill(0);

    translate(this.pos.x, this.pos.y);
    rotate(this.rotation);


    beginShape();
    for (let point = 0; point < this.radii.length; point++) {
      const angle = map(point, 0, this.radii.length, 0, TWO_PI);
      const radius = this.radii[point];

      const x = radius * cos(angle);
      const y = radius * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);

    // ellipse(0, 0, this.r * 2);

    pop();

  }
}