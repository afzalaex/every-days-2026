const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const PIXELS = 100;
const CELL = ART / PIXELS;

let palette = [];
let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();

  generate();
}

function generate() {
  background(0);

  createPalette();

  push();

  translate(OFFSET * viewScale, OFFSET * viewScale);
  scale(viewScale);

  noStroke();

  let angle = random([-1, 1]);
  let bandWidth = random(5, 14);
  let waveStrength = random(1, 5);
  let waveFrequency = random(0.08, 0.22);

  let xOffset = random(0, 100);
  let yOffset = random(0, 100);

  for (let y = 0; y < PIXELS; y++) {
    for (let x = 0; x < PIXELS; x++) {

      let diagonal;

      if (angle === 1) {
        diagonal = x + y;
      } else {
        diagonal = x - y + PIXELS;
      }

      let distortion =
        sin(y * waveFrequency + xOffset) * waveStrength +
        sin(x * waveFrequency * 0.7 + yOffset) * waveStrength;

      let value = diagonal + distortion;

      let band = floor(value / bandWidth);

      let local = floor(sin(x * 0.15 + y * 0.08) * 2);

      let index = (band + local) % palette.length;

      if (index < 0) {
        index += palette.length;
      }

      fill(palette[index]);

      rect(x * CELL, y * CELL, CELL + 0.5, CELL + 0.5);
    }
  }

  pop();
}

function createPalette() {
  palette = [];

  for (let i = 0; i < 10; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();

  resizeCanvas(SIZE * viewScale, SIZE * viewScale);

  generate();
}
