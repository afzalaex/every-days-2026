const SIZE = 1000;
const ART_W = 500;
const ART_H = 350;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

const LINE_COUNT = 80;

let viewScale = 1;
let palette = [];

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generate();
}

function generate() {
  background(0);

  palette = [];

  for (let i = 0; i < 6; i++) {
    palette.push(
      color(
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR)
      )
    );
  }

  push();

  translate(((SIZE - ART_W) / 2) * viewScale, ((SIZE - ART_H) / 2) * viewScale);

  scale(viewScale);

  const focusX = random(ART_W * 0.25, ART_W * 0.8);
  const focusY = random(ART_H * 0.2, ART_H * 0.8);

  const amplitude = random(12, 28);
  const frequency = random(0.008, 0.015);
  const bendStrength = random(0.12, 0.3);
  const influenceRadius = random(12000, 26000);

  const phase = random(TWO_PI);
  const direction = random([-1, 1]);

  const spacing = (ART_H - 30) / LINE_COUNT;

  noFill();

  for (let i = 0; i <= LINE_COUNT; i++) {
    const y = 15 + i * spacing;

    stroke(palette[floor(i / (LINE_COUNT / 6)) % 6]);
    strokeWeight(random(1.1, 1.7));

    beginShape();

    for (let x = 0; x <= ART_W; x += 3) {
      const dx = x - focusX;
      const dy = y - focusY;

      const radialDistance = dx * dx + dy * dy;

      const influence = exp(-radialDistance / influenceRadius);

      const primaryWave =
        sin(x * frequency + i * 0.035 * direction + phase) * amplitude;

      const secondaryWave =
        sin(x * frequency * 0.5 + phase + i * 0.02) * amplitude * 0.3;

      const bend = influence * dx * bendStrength;

      const verticalWave = sin(x * 0.004 + phase) * 5;

      vertex(x, y + primaryWave + secondaryWave + bend + verticalWave);
    }

    endShape();
  }

  pop();
}

function mousePressed() {
  generate();
}

function keyPressed() {
  if (key === " ") {
    generate();
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generate();
}
