const BASE = 1000;
const ART = 500;

const COUNT = 3500;
const STEP = 3;

let s;
let palette = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  strokeCap(SQUARE);
  noLoop();
}

function draw() {
  push();
  scale(s / BASE);

  background(0);

  palette = [];
  for (let i = 0; i < 6; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  translate((BASE - ART) / 2, (BASE - ART) / 2);

  noiseDetail(5, 0.5);

  for (let i = 0; i < COUNT; i++) {
    let x = random(ART);
    let y = random(ART);

    stroke(random(palette));
    strokeWeight(random(0.6, 2));
    noFill();

    beginShape();

    for (let j = 0; j < 45; j++) {
      vertex(x, y);

      let a = noise(x * 0.009, y * 0.009) * TAU * 4;

      x += cos(a) * STEP;
      y += sin(a) * STEP;

      if (x < 0 || x > ART || y < 0 || y > ART) break;
    }

    endShape();
  }

  pop();
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}
