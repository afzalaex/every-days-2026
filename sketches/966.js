const BASE = 1000;

const ART = 500;
const HALF = ART / 2;

const NUM_WAVES = 100;
const POINTS_PER_WAVE = 300;
const MAX_RADIUS = 250;

let s;
let seed;

function computeScale() {
  s = min(min(windowWidth, windowHeight), BASE);
}

function setup() {
  computeScale();

  createCanvas(s, s);

  noLoop();

  seed = random(100000);
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(0);

  push();

  scale(s / BASE);

  randomSeed(seed);

  translate(BASE / 2, BASE / 2);

  noFill();

  for (let wave = 0; wave < NUM_WAVES; wave++) {
    let radiusMultiplier = map(wave, 0, NUM_WAVES, 1, 0.2);

    let radius = MAX_RADIUS * radiusMultiplier;

    let col = color(random(155, 255), random(155, 255), random(155, 255));

    drawRadialWave(radius, POINTS_PER_WAVE, wave, col);
  }

  pop();
}

function drawRadialWave(radius, points, waveIndex, col) {
  push();

  stroke(col);
  strokeWeight(1);

  beginShape();

  for (let i = 0; i < points; i++) {
    let angle = map(i, 0, points, 0, TWO_PI);

    let distortion = sin(angle * waveIndex * 5) * 20;

    let x = cos(angle) * (radius + distortion);

    let y = sin(angle) * (radius + distortion);

    vertex(x, y);
  }

  endShape(CLOSE);

  pop();
}
