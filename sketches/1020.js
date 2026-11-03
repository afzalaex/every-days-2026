const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

const PARTICLES = 200;
const STEPS = 100;
const STEP_SIZE = 4;
const STROKE_WEIGHT = 2;

let palette = [];
let particles = [];
let viewScale = 1;

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
  particles = [];

  for (let i = 0; i < 100; i++) {
    palette.push(
      color(
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR)
      )
    );
  }

  for (let i = 0; i < PARTICLES; i++) {
    particles.push({
      x: random(ART),
      y: random(ART),
      angle: random(TWO_PI),
      length: random(4, 24),
      color: random(palette),
      drift: random(-0.035, 0.035),
    });
  }

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  strokeCap(SQUARE);
  strokeWeight(STROKE_WEIGHT);
  noFill();

  for (let p of particles) {
    let x = p.x;
    let y = p.y;
    let angle = p.angle;

    stroke(p.color);

    for (let j = 0; j < STEPS; j++) {
      if (x < 0 || x > ART || y < 0 || y > ART) break;

      let nx = x / ART;
      let ny = y / ART;

      let flow =
        sin(nx * 8.5 + ny * 3.2) * 0.55 +
        cos(ny * 10.0 - nx * 4.0) * 0.45 +
        sin((nx + ny) * 15.0) * 0.2;

      angle += flow * 0.12 + p.drift;

      let nextX = x + cos(angle) * STEP_SIZE;
      let nextY = y + sin(angle) * STEP_SIZE;

      if (random() > 0.16) {
        line(x, y, nextX, nextY);
      }

      x = nextX;
      y = nextY;
    }
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generate();
}

function keyPressed() {
  generate();
}
