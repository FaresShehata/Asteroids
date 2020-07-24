function resetGame() {
  asteroids = [];
  ufos = [];
  ufoBullets = [];
  ship.bullets = [];
  ship.pos.set(width / 2, height / 2);
  ship.vel.set(0, 0);
  ship.direction = -HALF_PI;
  lives--;
  maxAsteroids = startingAsteroids;
  speedMultiplier = startingSpeedMultiplier;
  maxUfos = 0;
  beatInterval = 120;
  frames = 1;

  for (let i = 0; i < maxAsteroids; i++) {
    asteroids.push(genericAsteroid());
  }
}