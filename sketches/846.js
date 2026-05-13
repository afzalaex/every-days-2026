const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

const COUNT = 2400;

let particles = [];
let seed;
let s;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();

  createCanvas(BASE * s, BASE * s);

  angleMode(DEGREES);

  noLoop();

  generate();
}

function generate() {
  randomSeed(seed);
  noiseSeed(seed);

  background(0);

  particles = [];

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: random(-HALF, HALF),
      y: random(-HALF, HALF),
      life: random(40, 120),
      weight: random(0.2, 2)
    });
  }

  push();

  scale(s);

  translate(BASE / 2, BASE / 2);

  for (let p of particles) {

    let x = p.x;
    let y = p.y;

    strokeWeight(p.weight);

    stroke(
      random(155, 255),
      random(155, 255),
      random(155, 255),
      40
    );

    noFill();

    beginShape();

    for (let i = 0; i < p.life; i++) {

      let n = noise(x * 0.004, y * 0.004);

      let angle =
        map(n, 0, 1, -180, 180) +
        dist(x, y, 0, 0) * 0.15;

      x += cos(angle) * 2;
      y += sin(angle) * 2;

      if (
        x < -HALF ||
        x > HALF ||
        y < -HALF ||
        y > HALF
      ) {
        break;
      }

      curveVertex(x, y);
    }

    endShape();
  }

  for (let i = 0; i < 1200; i++) {
    let a = random(360);
    let r = sqrt(random()) * HALF;

    let x = cos(a) * r;
    let y = sin(a) * r;

    noStroke();

    fill(255, random(10, 50));

    circle(x, y, random(0.5, 2));
  }

  pop();
}

function draw() {
  generate();
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();

  resizeCanvas(BASE * s, BASE * s);

  redraw();
}