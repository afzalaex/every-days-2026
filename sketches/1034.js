const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const CELLS = 25;
const CELL = ART / CELLS;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

let viewScale = 1;

function computeScale() {
  viewScale = Math.min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  generateArt();
  pop();
}

function generateArt() {
  background(0);
  noStroke();

  const cx = random(CELLS * 0.3, CELLS * 0.7);
  const cy = random(CELLS * 0.3, CELLS * 0.7);

  const radius = random(CELLS * 0.55, CELLS * 0.85);
  const phase = random(TWO_PI);

  const redPhase = random(TWO_PI);
  const greenPhase = random(TWO_PI);
  const bluePhase = random(TWO_PI);

  const angularPhase = random(TWO_PI);
  const angularStrength = random(0, 0.12);

  for (let y = 0; y < CELLS; y++) {
    for (let x = 0; x < CELLS; x++) {
      const dx = x - cx;
      const dy = y - cy;

      const distanceFromCenter = sqrt(dx * dx + dy * dy);
      const angle = atan2(dy, dx);

      const wave = (distanceFromCenter / radius) * TWO_PI + phase;

      const variation =
        angularStrength *
        sin(angle * 4 + angularPhase) *
        sin(distanceFromCenter * 0.25);

      const rWave = (1 + cos(wave + redPhase)) / 2;
      const gWave = (1 + cos(wave + greenPhase)) / 2;
      const bWave = (1 + cos(wave + bluePhase)) / 2;

      const r = constrain(
        map(rWave + variation, 0, 1, MIN_COLOR, MAX_COLOR),
        MIN_COLOR,
        MAX_COLOR
      );

      const g = constrain(
        map(gWave + variation, 0, 1, MIN_COLOR, MAX_COLOR),
        MIN_COLOR,
        MAX_COLOR
      );

      const b = constrain(
        map(bWave + variation, 0, 1, MIN_COLOR, MAX_COLOR),
        MIN_COLOR,
        MAX_COLOR
      );

      fill(r, g, b);

      rect(OFFSET + x * CELL, OFFSET + y * CELL, CELL + 0.5, CELL + 0.5);
    }
  }
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
