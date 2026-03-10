const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

const DEPTH = 5;

let SIDES = 4;        
const MAX_SIDES = 10;

let viewScale = 1;
let shapes = [];
let mode = 0;

function setup() {
  computeCanvas();
  rebuild();
}

function windowResized() {
  computeCanvas();
  redraw();
}

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
}

function rebuild() {
  shapes = [];

  let r = HALF * 1.2;
  let offset = -PI / 2;

  for (let i = 0; i < SIDES; i++) {
    let a1 = offset + i * TWO_PI / SIDES;
    let a2 = offset + (i + 1) * TWO_PI / SIDES;

    subdivide(
      {
        x1: 0, y1: 0,
        x2: cos(a1) * r, y2: sin(a1) * r,
        x3: cos(a2) * r, y3: sin(a2) * r
      },
      DEPTH
    );
  }

  redraw();
}

function subdivide(t, depth) {
  if (depth === 0) {
    shapes.push({
      t,
      col: color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      )
    });
    return;
  }

  const phi = (1 + sqrt(5)) / 2;

  if (mode % 2 === 0) {
    let px = t.x1 + (t.x2 - t.x1) / phi;
    let py = t.y1 + (t.y2 - t.y1) / phi;

    subdivide(
      { x1: t.x3, y1: t.y3, x2: px, y2: py, x3: t.x2, y3: t.y2 },
      depth - 1
    );
    subdivide(
      { x1: px, y1: py, x2: t.x3, y2: t.y3, x3: t.x1, y3: t.y1 },
      depth - 1
    );
  } else {
    let px = t.x1 + (t.x3 - t.x1) / phi;
    let py = t.y1 + (t.y3 - t.y1) / phi;

    subdivide(
      { x1: t.x2, y1: t.y2, x2: px, y2: py, x3: t.x3, y3: t.y3 },
      depth - 1
    );
    subdivide(
      { x1: px, y1: py, x2: t.x1, y2: t.y1, x3: t.x2, y3: t.y2 },
      depth - 1
    );
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  drawingContext.save();
  drawingContext.beginPath();

  let offset = -PI / 2;
  for (let i = 0; i < SIDES; i++) {
    let a = offset + i * TWO_PI / SIDES;
    let x = cos(a) * HALF;
    let y = sin(a) * HALF;
    if (i === 0) drawingContext.moveTo(x, y);
    else drawingContext.lineTo(x, y);
  }
  drawingContext.closePath();
  drawingContext.clip();

  noFill();
  strokeWeight(2);

  for (let s of shapes) {
    stroke(s.col);
    triangle(
      s.t.x1, s.t.y1,
      s.t.x2, s.t.y2,
      s.t.x3, s.t.y3
    );
  }

  drawingContext.restore();
  pop();
}

function mousePressed() {
  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;

  if (dist(mx, my, 0, 0) <= HALF) {
    SIDES++;
    if (SIDES > MAX_SIDES) SIDES = 4;

    mode++;

    rebuild();
  }
}
