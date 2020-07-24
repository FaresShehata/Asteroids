class Bullet extends Game {

  constructor(pos, vel) {
    super(pos, vel, 3);
    this.startingFrame = frames;
  }

  move() {
    this.pos.add(this.vel);
    if (this.pos.x + this.r < 0) this.pos.x = width;
    if (this.pos.x - this.r > width) this.pos.x = 0;
    if (this.pos.y + this.r < 0) this.pos.y = height;
    if (this.pos.y - this.r > height) this.pos.y = 0;
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

}