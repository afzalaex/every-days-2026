const BASE = 1000;
const ART = 500;

let viewScale;
let points = [];

const STEP = 20;
const HALF = ART / 2;
const DOT_RADIUS = 10;

const HOVER_RADIUS = ART * 0.4;
const CHAOS = STEP * 1;
const SNAP_DIST = 1.5;

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
}

function setup() {
  computeCanvas();
  colorMode(RGB, 255);
  generateGrid();
}

function windowResized() {
  computeCanvas();
}

function generateGrid() {
  points = [];

  for (let y = -HALF; y <= HALF; y += STEP) {
    for (let x = -HALF; x <= HALF; x += STEP) {
      points.push({
        ox: x,
        oy: y,
        x: x + random(-CHAOS, CHAOS),
        y: y + random(-CHAOS, CHAOS),
        c: color(
          random(155, 255),
          random(155, 255),
          random(155, 255)
        )
      });
    }
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;
  mx = constrain(mx, -HALF, HALF);
  my = constrain(my, -HALF, HALF);

  for (let p of points) {
    let d = dist(mx, my, p.ox, p.oy);

    if (d < HOVER_RADIUS) {
      let t = 1 - d / HOVER_RADIUS;
      t = pow(t, 2);

      p.x = lerp(p.x, p.ox, t * 0.15);
      p.y = lerp(p.y, p.oy, t * 0.15);

      if (dist(p.x, p.y, p.ox, p.oy) < SNAP_DIST) {
        p.x = p.ox;
        p.y = p.oy;
      }
    }
  }

  noStroke();
  for (let p of points) {
    fill(p.c);
    circle(p.x, p.y, DOT_RADIUS);
  }

  pop();
}

