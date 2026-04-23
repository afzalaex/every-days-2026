const BASE = 1000;
const ART = 500;

let s = 1;

const N = 100;

let centerBias;
let latticeAngle;
let memoryFlip;
let seed;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  pixelDensity(1);
  noLoop();

  initParams();
  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function initParams() {
  seed = floor(random(100000));

  centerBias = random(0.25, 0.55);
  latticeAngle = random(-PI / 3, PI / 3);
  memoryFlip = random(0.45, 0.55);
}

function generate() {
  background(0);

  push();
  scale(s);

  const cell = ART / N;

  translate(BASE / 2 - ART / 2, BASE / 2 - ART / 2);

  randomSeed(seed);

  let memory = [];

  for (let y = 0; y < N; y++) {
    memory[y] = [];
    for (let x = 0; x < N; x++) {
      memory[y][x] = random() > 0.5 ? 1 : 0;
    }
  }

  // cellular smoothing
  for (let k = 0; k < 4; k++) {
    for (let y = 1; y < N - 1; y++) {
      for (let x = 1; x < N - 1; x++) {

        let surr =
          memory[y-1][x] +
          memory[y+1][x] +
          memory[y][x-1] +
          memory[y][x+1];

        if (surr === 2 && random() < memoryFlip) {
          memory[y][x] = 1 - memory[y][x];
        }
      }
    }
  }

  noStroke();

  let latticeScale = random(6, 10);

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {

      const px = x * cell;
      const py = y * cell;

      const dx = x / N - 0.5;
      const dy = y / N - 0.5;
      const r = sqrt(dx * dx + dy * dy);

      const radial = 1.0 - constrain(r / centerBias, 0, 1);

      const proj =
        (dx * cos(latticeAngle) +
         dy * sin(latticeAngle)) * latticeScale;

      const lattice = abs(sin(proj * PI));

      const mem = memory[y][x];

      let authority =
        radial * 0.35 +
        lattice * 0.35 +
        mem * 0.2;

      if (authority < 0.55) continue;

      fill(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );

      rect(px, py, cell, cell);
    }
  }

  pop();
}

function mousePressed() {
  let nx = constrain(mouseX / width, 0, 1);
  let ny = constrain(mouseY / height, 0, 1);

  centerBias = map(nx, 0, 1, 0.2, 0.7);
  latticeAngle = map(nx, 0, 1, -PI / 2, PI / 2);
  memoryFlip = map(ny, 0, 1, 0.2, 0.8);

  seed = floor(random(100000));

  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  generate();
}