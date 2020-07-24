class UfoBullet extends Bullet {

  constructor(pos, vel) {
    super(pos, vel);
  }

  show() {
    fill(255, 10, 10);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}