const BASE = 1000;
const ART = 500;

const COUNT = 1500;
const STEPS = 80;
const STEP = 2;

let s;
let palette = [];
let seeds = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  strokeCap(SQUARE);
  noLoop();
  generate();
}

function generate() {
  randomSeed(floor(random(1e9)));

  palette = [];
  for (let i = 0; i < 8; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  seeds = [];

  for (let i = 0; i < 10; i++) {
    seeds.push({
      x: random(ART),
      y: random(ART),
      s: random() < 0.5 ? random(-1.2, -0.4) : random(0.4, 1.2),
    });
  }

  redraw();
}

function draw() {
  background(0);

  push();
  scale(s / BASE);
  translate((BASE - ART) / 2, (BASE - ART) / 2);

  noFill();

  for (let i = 0; i < COUNT; i++) {
    let x = random(ART);
    let y = random(ART);

    let c = random(palette);

    stroke(red(c), green(c), blue(c), 55);
    strokeWeight(2);

    beginShape();

    for (let j = 0; j < STEPS; j++) {
      vertex(x, y);

      let vx = 0;
      let vy = 0;

      for (let k = 0; k < seeds.length; k++) {
        let dx = seeds[k].x - x;
        let dy = seeds[k].y - y;

        let d2 = dx * dx + dy * dy + 100;

        let f = (seeds[k].s * 700) / d2;

        vx += -dy * f;
        vy += dx * f;
      }

      let m = sqrt(vx * vx + vy * vy);

      if (m < 0.000001) break;

      x += (vx / m) * STEP;
      y += (vy / m) * STEP;

      if (x < 0 || x > ART || y < 0 || y > ART) {
        break;
      }
    }

    endShape();
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}