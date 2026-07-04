const BASE = 1000;
const ART = 500;

let s;

const COUNT = 1400;
const STEP = 3;
const STEPS = 50;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  strokeCap(SQUARE);
  noFill();
  noLoop();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  push();
  scale(s / BASE);

  background(0);
  translate((BASE - ART) / 2, (BASE - ART) / 2);

  noiseSeed(floor(random(100000)));

  for (let i = 0; i < COUNT; i++) {
    let x = random(ART);
    let y = random(ART);

    let pts = [];

    for (let j = 0; j < STEPS; j++) {
      pts.push(createVector(x, y));

      let a = floor(noise(x * 0.01, y * 0.01) * 8) * QUARTER_PI;

      x += cos(a) * STEP;
      y += sin(a) * STEP;

      if (x < 0 || x > ART || y < 0 || y > ART) break;
    }

    if (pts.length < 8) continue;

    stroke(random(155, 255), random(155, 255), random(155, 255));

    strokeWeight(1);

    beginShape();

    for (let p of pts) {
      vertex(p.x, p.y);
    }

    endShape();

    if (random() < 0.45) {
      strokeWeight(1);

      for (let k = 0; k < pts.length - 5; k += 5) {
        stroke(random(155, 255), random(155, 255), random(155, 255));

        line(pts[k].x, pts[k].y, pts[k + 5].x, pts[k + 5].y);
      }
    }
  }

  pop();
}

function mouseClicked() {
  redraw();
}
