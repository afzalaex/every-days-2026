const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;
let seeds = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function generateSeeds() {
  seeds = [];
  for (let i = 0; i < 120; i++) {
    seeds.push({
      x: random(-HALF, HALF),
      y: random(-HALF, HALF),
    });
  }
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noStroke();
  generateSeeds();
  noLoop();
}

function draw() {
  background(0);
  push();
  translate(width / 2, height / 2);
  scale(s);

  let step = 12;

  for (let x = -HALF; x < HALF; x += step) {
    for (let y = -HALF; y < HALF; y += step) {
      let nearest = Infinity;
      let second = Infinity;
      let region = 0;

      for (let i = 0; i < seeds.length; i++) {
        let d = dist(x, y, seeds[i].x, seeds[i].y);
        if (d < nearest) {
          second = nearest;
          nearest = d;
          region = i;
        } else if (d < second) {
          second = d;
        }
      }

      let edge = second - nearest;
      let r = map(sin(region * 1.7), -1, 1, 155, 255);
      let g = map(cos(region * 2.3), -1, 1, 155, 255);
      let b = map(sin(region * 0.9 + 4), -1, 1, 155, 255);
      let shade = map(edge, 0, 50, 0.2, 1, true);

      fill(r * shade, g * shade, b * shade);
      rect(x, y, step + 1, step + 1);
    }
  }

  pop();
}

function mousePressed() {
  generateSeeds();
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}