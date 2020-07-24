function rednerScene() {
  background(0);

  for (let b of ship.bullets) b.render();
  ship.render();

  for (let a of asteroids) a.render();

  for (let b of ufoBullets) b.render();
  for (let u of ufos) u.render();

  showLivesAndScore();
}

function showLivesAndScore() {
  fill(255);
  stroke(0);
  textSize(20);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Lives: " + lives, 10, 10);
  text("Score: " + score, 10, 30);

  textAlign(CENTER, TOP);
  text("Controls:", 92, height - 100);

  text("W\nA  D\nSPACE", 40, height - 75);
  text("OR", 90, height - 50);
  text("^\n<  >\nSPACE", 140, height - 75);

  text("ASTEROIDS BY FARES", width / 2, 10);
  stroke(255);
  line(width / 2 - 110, 30, width / 2 + 110, 30);
}