const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

const STEP = 25;
const EFFECT_RADIUS = 120;

let viewScale = 1;
let points = [];
let cols, rows;

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

  cols = floor(ART / STEP) + 1;
  rows = cols;

  for (let x = -HALF; x <= HALF; x += STEP) {
    for (let y = -HALF; y <= HALF; y += STEP) {
      points.push({
        x,
        y,
        ox: x,
        oy: y,
        vx: 0,
        vy: 0,
        stress: 0,
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

    let dx = mx - p.x;
    let dy = my - p.y;
    let d = sqrt(dx * dx + dy * dy);

    if (d < EFFECT_RADIUS && d > 0.001) {
      let f = (EFFECT_RADIUS - d) / EFFECT_RADIUS;
      p.vx += (dx / d) * f * 6;
      p.vy += (dy / d) * f * 6;
      p.stress = max(p.stress, f);
    }

    p.stress *= 0.94;

    p.vx *= 0.89;
    p.vy *= 0.89;

    p.x += p.vx;
    p.y += p.vy;
  }

  drawDiagonalMesh();

  pop();
}

function drawDiagonalMesh() {
  for (let i = 0; i < cols - 1; i++) {
    for (let j = 0; j < rows - 1; j++) {

      let p1 = points[j + i * rows];
      let p2 = points[j + (i + 1) * rows];
      let p3 = points[(j + 1) + i * rows];
      let p4 = points[(j + 1) + (i + 1) * rows];

      let stress =
        (p1.stress + p2.stress + p3.stress + p4.stress) * 0.25;

      stroke(
        constrain(p1.col[0] + stress * 30, 0, 255),
        constrain(p1.col[1] + stress * 30, 0, 255),
        constrain(p1.col[2] + stress * 30, 0, 255)
      );

      strokeWeight(2.5);

      line(p1.x, p1.y, p4.x, p4.y);
      line(p2.x, p2.y, p3.x, p3.y);
    }
  }
}


