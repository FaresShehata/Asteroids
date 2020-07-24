class Ufo extends Game {

  constructor() {
    super(randomInitialPos(), null, random([bigUfoR, smallUfoR]));
    this.vels = this.getVels(this.pos);
    this.currentVelIndex = 0;
    this.startingFrame = frames;
    this.interval = floor(random(60, 90));
  }

  getVels(pos) {
    const arr = [calculateInitialVel(pos, 1)];
    let angle = arr[0].heading();
    for (let i = 0; i < 100; i++) {
      angle += random(radians(30), radians(80)) * random([1, -1]);
      arr.push(p5.Vector.fromAngle(angle));
    }
    for (let v of arr) v.setMag(ufoSpeed);
    return arr;
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(0);
    stroke(255, 10, 10);

    quad(
      -this.r * 0.2, -this.r * 0.95,
      this.r * 0.2, -this.r * 0.95,
      this.r * 0.5, -this.r * 0.55,
      -this.r * 0.5, -this.r * 0.55);

    quad(
      this.r * 0.5, -this.r * 0.55,
      -this.r * 0.5, -this.r * 0.55,
      -this.r, -this.r * 0.05,
      this.r, -this.r * 0.05);

    quad(
      -this.r, -this.r * 0.05,
      this.r, -this.r * 0.05,
      this.r * 0.4, this.r * 0.7,
      -this.r * 0.4, this.r * 0.7);

    pop();

  }

  move() {
    this.pos.add(this.vels[this.currentVelIndex]);

    const diff = frames - this.startingFrame;
    if (diff % this.interval == 0 && this.currentVelIndex < this.vels.length - 1) {
      this.currentVelIndex++;
      this.interval = floor(random(60, 90));
    }
  }

  shoot() {
    const v = ship.pos.copy();
    v.sub(this.pos.copy());
    v.setMag(bulletSpeed);
    const choices = [
      0, random(radians(5), radians(10)) * random([1, -1])
    ];
    let angle;
    if (random(1) < 0.1)
      angle = choices[0];
    else
      angle = choices[1];
    v.rotate(angle);
    // console.log(v.toString());
    ufoBullets.push(new UfoBullet(this.pos.copy(), v));
  }
}