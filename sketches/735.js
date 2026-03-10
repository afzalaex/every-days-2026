const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

const STEP = 20;
const EFFECT_RADIUS = 120;

let viewScale = 1;
let points = [];

function setup() {
  computeCanvas();
  initGrid();
}

function windowResized() {
  computeCanvas();
}

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
}

function initGrid() {
  points = [];

  for (let x = -HALF; x <= HALF; x += STEP) {
    for (let y = -HALF; y <= HALF; y += STEP) {
      points.push({
        x,
        y,
        ox: x,
        oy: y,
        vx: 0,
        vy: 0,
        col: [
          random(155, 255),
          random(155, 255),
          random(155, 255)
        ]
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

  for (let p of points) {
    p.vx += (p.ox - p.x) * 0.05;
    p.vy += (p.oy - p.y) * 0.05;

    let dx = p.x - mx;
    let dy = p.y - my;
    let d = sqrt(dx * dx + dy * dy);

    if (d < EFFECT_RADIUS && d > 0.001) {
      let f = (EFFECT_RADIUS - d) / EFFECT_RADIUS;
      p.vx += (dx / d) * f * 8;
      p.vy += (dy / d) * f * 8;
    }

    p.vx *= 0.85;
    p.vy *= 0.85;

    p.x += p.vx;
    p.y += p.vy;

    p.x = constrain(p.x, -HALF, HALF);
    p.y = constrain(p.y, -HALF, HALF);
  }

  let cols = floor(ART / STEP) + 1;

  noFill();

  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < cols - 1; j++) {
      let p1 = points[j + i * cols];
      let p2 = points[j + (i + 1) * cols];
      let p3 = points[(j + 1) + (i + 1) * cols];
      let p4 = points[(j + 1) + i * cols];

      stroke(p1.col[0], p1.col[1], p1.col[2]);
      strokeWeight(3);

      beginShape();
      vertex(p1.x, p1.y);
      vertex(p2.x, p2.y);
      vertex(p3.x, p3.y);
      vertex(p4.x, p4.y);
      endShape(CLOSE);
    }
  }

  pop();
}







