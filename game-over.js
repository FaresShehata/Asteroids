function gameOver() {
  fill(250, 50, 50);
  background(50, 150);
  stroke(0);
  strokeWeight(3);
  textSize(100);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("GAME\nOVER", width / 2, height / 2);
  textSize(30);
  text("REFRESH TO TRY AGAIN", width / 2, height / 2 + 150);
  noLoop();
}