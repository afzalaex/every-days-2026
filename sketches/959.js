const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const GRID_SIZE = 25;
const PATHS = 110;

const MIN_STEPS = 4;
const MAX_STEPS = 28;

const STEP = ART / GRID_SIZE;
const LINE_WEIGHT = 2;

let viewScale;

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();

  generate();
}

function draw() {}

function computeScale() {
  viewScale = min(windowWidth, windowHeight) / SIZE;
}

function generate() {
  background(0);

  push();

  translate(OFFSET * viewScale, OFFSET * viewScale);
  scale(viewScale);

  noFill();
  strokeWeight(LINE_WEIGHT);
  strokeCap(SQUARE);
  strokeJoin(MITER);

  for (let i = 0; i < PATHS; i++) {
    drawPath();
  }

  pop();
}

function drawPath() {
  let col = floor(random(GRID_SIZE));
  let row = floor(random(GRID_SIZE));

  let x = col * STEP + STEP / 2;
  let y = row * STEP + STEP / 2;

  let steps = floor(random(MIN_STEPS, MAX_STEPS));

  stroke(random(155, 255), random(155, 255), random(155, 255));

  beginShape();
  vertex(x, y);

  for (let i = 0; i < steps; i++) {
    let angle = noise(x * 0.012, y * 0.012, i * 0.08) * TWO_PI * 2;

    let dir = floor(angle / HALF_PI + 0.5) * HALF_PI;

    let nx = x + cos(dir) * STEP;
    let ny = y + sin(dir) * STEP;

    nx = constrain(nx, STEP / 2, ART - STEP / 2);
    ny = constrain(ny, STEP / 2, ART - STEP / 2);

    vertex(nx, ny);

    x = nx;
    y = ny;

    if (random() < 0.08) {
      break;
    }
  }

  endShape();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generate();
}
