const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;
let walkers = [];
let occupied;

const STEP = 10;
const LIMIT = 25;
const WALKERS = 300;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noStroke();
  generate();
  noLoop();
}

function generate() {
  walkers = [];
  occupied = {};

  for (let i = 0; i < WALKERS; i++) {
    walkers.push({
      x: floor(random(-LIMIT, LIMIT + 1)),
      y: floor(random(-LIMIT, LIMIT + 1)),
      dir: floor(random(4)),
      life: floor(random(180, 420)),
      c: color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      )
    });
  }
}

function draw() {
  background(0);

  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  for (let w of walkers) {
    let gx = w.x;
    let gy = w.y;

    fill(w.c);

    for (let i = 0; i < w.life; i++) {
      let key = gx + "," + gy;

      if (occupied[key]) break;
      occupied[key] = true;

      let px = gx * STEP;
      let py = gy * STEP;

      circle(px, py, 4);

      gx += round(cos(w.dir * HALF_PI));
      gy += round(sin(w.dir * HALF_PI));

      if (random() < 0.18) {
        w.dir += random() < 0.5 ? -1 : 1;
        w.dir = (w.dir + 4) % 4;
      }

      if (random() < 0.05) {
        w.dir = (w.dir + 2) % 4;
      }

      if (gx < -LIMIT || gx > LIMIT || gy < -LIMIT || gy > LIMIT) {
        break;
      }
    }
  }

  pop();
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}