// https://asteroids.netlify.com/

// Variables
let ship;
let asteroids = [];
let ufos = [];
let ufoBullets = [];
const bulletSpeed = 5;
const shipAcc = 0.1;
const maxShipSpeed = 4;
const ufoSpeed = 1.5;
const bulletLife = 100;
const ufoBulletLife = 90;

let maxUfos = 0;
const bigUfoR = 25;
const smallUfoR = 18;
let lives = 3;
let score = 0;
let frames = 1;
const startingAsteroids = 15;
let maxAsteroids = startingAsteroids;
const startingSpeedMultiplier = 3.5;
let speedMultiplier = startingSpeedMultiplier;

let thrustSound, fireSound;
let bangSmallSound, bangMediumSound, bangLargeSound;
let beat1, beat2;
let smallUfoSound, bigUfoSound;
let beatInterval = 120;


// Loading sound effects
function preload() {
	thrustSound = loadSound('sounds/thrust.wav');
	fireSound = loadSound('sounds/fire.wav');
	bangSmallSound = loadSound('sounds/bangSmall.wav');
	bangMediumSound = loadSound('sounds/bangMedium.wav');
	bangLargeSound = loadSound('sounds/bangLarge.wav');
	beat1 = loadSound('sounds/beat1.wav');
	beat2 = loadSound('sounds/beat2.wav');
	smallUfoSound = loadSound('sounds/smallUfoSound.wav');
	bigUfoSound = loadSound('sounds/bigUfoSound.wav');
}

// Initial setup
function setup() {
	createCanvas(windowWidth, windowHeight);

	ship = new Ship();

	for (let i = 0; i < maxAsteroids; i++) {
		asteroids.push(genericAsteroid());
	}

	thrustSound.setVolume(0.5);
	fireSound.setVolume(0.2);
	bangSmallSound.setVolume(0.3);
	bangMediumSound.setVolume(0.3);
	bangLargeSound.setVolume(0.3);
	smallUfoSound.setVolume(0.2);
	bigUfoSound.setVolume(0.2);

}


function draw() {
	// Drawing everything
	rednerScene();

	// Cheking for bullets hitting asteroids
	for (let i = ship.bullets.length - 1; i >= 0; i--) {
		for (let j = asteroids.length - 1; j >= 0; j--) {
			if (
				(asteroids[j]) && (ship.bullets[i]) &&
				ship.bullets[i].hits(asteroids[j])) {

				if (asteroids[j].size == 3) {
					score += 10;
					bangLargeSound.play();
				} else if (asteroids[j].size == 2) {
					score += 100;
					bangMediumSound.play();
				} else if (asteroids[j].size == 1) {
					score += 200;
					bangSmallSound.play();
				}

				asteroids[j].split(ship.bullets[i]);
				asteroids.splice(j, 1);
				ship.bullets.splice(i, 1);
			}
		}
	}

	// Checking for bullets hitting ufos
	for (let i = ship.bullets.length - 1; i >= 0; i--) {
		for (let j = ufos.length - 1; j >= 0; j--) {
			if (ship.bullets[i].hits(ufos[j])) {
				if (ufos[j].r == smallUfoR) {
					score += 1000;
					bangSmallSound.play();
				} else if (ufos[j].r == bigUfoR) {
					score += 200;
					bangMediumSound.play();
				}

				ufos.splice(j, 1);
				ship.bullets.splice(i, 1);
			}
		}
	}

	// Deleting bullets after they have been out for their set time
	for (let i = ship.bullets.length - 1; i >= 0; i--) {
		const diff = frames - ship.bullets[i].startingFrame;
		if (diff > bulletLife) ship.bullets.splice(i, 1);
	}

	// Counting No. big asteroids
	// Deleting asteroids offscreen
	// Checking for the ship hitting asteroid
	let totalBigAsteroids = 0;
	for (let i = asteroids.length - 1; i >= 0; i--) {
		if (asteroids[i]) {
			if (asteroids[i].size == 3) totalBigAsteroids++;

			if (asteroids[i].isOffScreen()) asteroids.splice(i, 1);

			if (ship.hits(asteroids[i])) resetGame();
		}
	}
	// No. big asteroids on screen
	if (totalBigAsteroids < maxAsteroids) {
		asteroids.push(genericAsteroid());
	}

	// Cheking for the ship hitting a ufo
	for (let i = ufos.length - 1; i >= 0; i--) {
		if (ship.hits(ufos[i])) resetGame();
	}

	// Having Ufos shoot
	// Deleting Ufos offscreen
	for (let i = ufos.length - 1; i >= 0; i--) {
		const diff = frames - ufos[i].startingFrame;
		if (diff > 30 && diff % 60 == 0) ufos[i].shoot();

		if (ufos[i].isOffScreen()) ufos.splice(i, 1);
	}

	// Cheking for Ufo bullets hitting ship
	// Deleting Ufo bullets after they have been out
	// for their set time
	for (let i = ufoBullets.length - 1; i >= 0; i--) {
		const diff = frames - ufoBullets[i].startingFrame;
		if (diff > ufoBulletLife) ufoBullets.splice(i, 1);

		if (ship.hits(ufoBullets[i])) resetGame();
	}

	// Playing the ufo sound, prioritising small ufos
	if (ufos.length != 0 && frameCount % 7 == 0) {
		let small = false;
		for (let u of ufos) {
			if (u.r == smallUfoR) small = true;
		}
		if (small)
			smallUfoSound.play();
		else
			bigUfoSound.play();
	}

	// Every 20 seconds:
	// Increasing the maximum No. asteroids
	// Increasing the speed of asteroids
	// Increasing the speed of the background "music"
	// Increasing the maximum No. ufos by 1/3 i.e. every 60 seconds
	// max ufos increaces
	if (frames % 1200 == 0) {
		maxAsteroids += 2;
		speedMultiplier += 0.2;
		maxUfos += 1 / 3;
		beatInterval -= 10;
		beatInterval = constrain(beatInterval, 60, 120);
		if (ufos.length < floor(maxUfos)) {
			for (let i = 0; i < floor(maxUfos); i++)
				ufos.push(new Ufo());
		}
	}

	// Checking if player has 0 lives
	if (lives == 0) gameOver();

	// Playing sound
	if (frameCount % beatInterval == 0)
		beat1.play();
	else if (frameCount % beatInterval == (beatInterval / 2))
		beat2.play();

	// Controls for moving the ship
	if (keyIsDown(87) || keyIsDown(38)) ship.moving = true; // w, forward
	else ship.moving = false;
	if (keyIsDown(68) || keyIsDown(39)) ship.turn(1); // d, right
	if (keyIsDown(65) || keyIsDown(37)) ship.turn(-1); // a, left

	frames++;
}

function keyPressed() {
	// Controls for shooting bullets
	if (key === ' ') {
		ship.shoot();
		fireSound.play();
	}
}

// Functions for initialaisng ufos and asteroids
function genericAsteroid() {
	const pos = randomInitialPos();
	const size = 3;
	const vel = calculateInitialVel(pos, size);
	return new Asteroid(pos, vel, size);
}

function randomInitialPos() {
	const choices = [
		createVector(random(-50, width + 50), -50),
		createVector(-50, random(-50, height + 50)),
		createVector(width + 50, random(-50, height + 50)),
		createVector(random(-50, width + 50), height + 50)
	];

	const v = random(choices);
	return v;
}

function calculateInitialVel(pos, size) {
	let angle;
	if (pos.x > width / 2 && pos.y > height / 2) {
		// Bottom right
		angle = random(radians(190), radians(260));
	} else if (pos.x > width / 2 && pos.y < height / 2) {
		// Top right
		angle = random(radians(100), radians(170));
	} else if (pos.x < width / 2 && pos.y > height / 2) {
		// Bottom left
		angle = random(radians(-80), radians(-10));
	} else {
		// Top left
		angle = random(radians(10), radians(80));
	}

	const speed = speedMultiplier / size;
	const v = p5.Vector.fromAngle(angle, speed);
	return v;
}