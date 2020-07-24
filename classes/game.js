class Game {
  constructor(pos, vel, r) {
    this.pos = pos;
    this.vel = vel;
    this.r = r;
  }

  hits(other) {
    if (other) {
      return (this.pos.dist(other.pos) < this.r + other.r);
    } else {
      return false;
    }
  }

  render() {
    this.show();
    this.move();
  }

  isOffScreen() {
    return (
      this.pos.x < -50 || this.pos.x > width + 50 ||
      this.pos.y < -50 || this.pos.y > height + 50);
  }
}