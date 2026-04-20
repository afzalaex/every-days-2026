const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;

const COUNT = 360;
const LINK_DIST = 60;

let nodes = [];

function setup() {
  computeCanvas();
  init();
}

function windowResized() {
  computeCanvas();
}

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
}

function init() {
  nodes = [];

  for (let i = 0; i < COUNT; i++) {
    nodes.push({
      x: random(-HALF, HALF),
      y: random(-HALF, HALF),
      vx: random(-1, 1),
      vy: random(-1, 1),
      col: [
        random(155, 255),
        random(155, 255),
        random(155, 255)
      ]
    });
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;

  for (let n of nodes) {

    let dx = mx - n.x;
    let dy = my - n.y;
    let d = sqrt(dx * dx + dy * dy);

    if (d > 1) {
      n.vx += (dx / d) * 0.05;
      n.vy += (dy / d) * 0.05;
    }

    for (let other of nodes) {
      if (n === other) continue;

      let dx2 = n.x - other.x;
      let dy2 = n.y - other.y;
      let d2 = sqrt(dx2 * dx2 + dy2 * dy2);

      if (d2 > 0 && d2 < 25) {
        n.vx += (dx2 / d2) * 0.3;
        n.vy += (dy2 / d2) * 0.3;
      }
    }

    n.vx *= 0.94;
    n.vy *= 0.94;

    n.x += n.vx;
    n.y += n.vy;

    if (n.x < -HALF) { n.x = -HALF; n.vx *= -0.6; }
    if (n.x > HALF)  { n.x = HALF;  n.vx *= -0.6; }
    if (n.y < -HALF) { n.y = -HALF; n.vy *= -0.6; }
    if (n.y > HALF)  { n.y = HALF;  n.vy *= -0.6; }
  }

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {

      let a = nodes[i];
      let b = nodes[j];

      let d = dist(a.x, a.y, b.x, b.y);

      if (d < LINK_DIST) {
        let alpha = map(d, 0, LINK_DIST, 220, 20);

        stroke(a.col[0], a.col[1], a.col[2], alpha);
        strokeWeight(1.5);

        line(a.x, a.y, b.x, b.y);
      }
    }
  }

  pop();
}