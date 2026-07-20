const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const LAYERS = [
  { count: 4, min: 48, max: 62 },
  { count: 8, min: 34, max: 46 },
  { count: 16, min: 22, max: 32 },
  { count: 32, min: 13, max: 20 },
  { count: 80, min: 5, max: 12 },
];

let bubbles = [];
let attractors = [];

let s;

function computeScale() {
  s = min(windowWidth, windowHeight, SIZE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  noLoop();
}

function draw() {
  scale(s / SIZE);

  background(0);

  bubbles = [];
  attractors = [];

  for (let i = 0; i < 5; i++) {
    attractors.push({
      x: random(OFFSET + 80, OFFSET + ART - 80),
      y: random(OFFSET + 80, OFFSET + ART - 80),
    });
  }

  for (let layer of LAYERS) {
    let placed = 0;
    let tries = 0;

    while (placed < layer.count && tries < 5000) {
      tries++;

      let useCluster = random() < 0.7;
      let x, y;

      if (useCluster) {
        let a = random(attractors);

        x = a.x + randomGaussian() * 70;
        y = a.y + randomGaussian() * 70;
      } else {
        x = random(OFFSET, OFFSET + ART);
        y = random(OFFSET, OFFSET + ART);
      }

      let r = random(layer.min, layer.max);

      if (
        x - r < OFFSET ||
        x + r > OFFSET + ART ||
        y - r < OFFSET ||
        y + r > OFFSET + ART
      )
        continue;

      let ok = true;

      for (let b of bubbles) {
        let gap = random(1, 5);

        if (dist(x, y, b.x, b.y) < r + b.r + gap) {
          ok = false;
          break;
        }
      }

      if (!ok) continue;

      bubbles.push({
        x,
        y,
        r,
        mode: floor(random(3)),
        c: color(random(155, 255), random(155, 255), random(155, 255)),
      });

      placed++;
    }
  }

  strokeWeight(2);

  for (let b of bubbles) {
    if (b.mode == 1) {
      noFill();
      stroke(b.c);
    } else {
      fill(b.c);
      noStroke();
    }

    circle(b.x, b.y, b.r * 2);
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function mousePressed() {
  redraw();
}