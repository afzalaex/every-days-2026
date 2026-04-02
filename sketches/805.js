const BASE = 1000;
let s = 1;

let verticals = [];
let horizontals = [];
let cells = [];

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noStroke();

  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight) / BASE;
  s = min(s, 1);
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function generate() {
  verticals = [];
  horizontals = [];
  cells = [];

  let divisions = 10;

  for (let i = 1; i < divisions; i++) {
    if (random() < 0.6) verticals.push(i / divisions);
    if (random() < 0.6) horizontals.push(i / divisions);
  }

  verticals.sort();
  horizontals.sort();

  buildCells();

  for (let c of cells) {
    c.col = [
      random(155, 255),
      random(155, 255),
      random(155, 255)
    ];
  }

  redraw();
}

function buildCells() {
  let xs = [0, ...verticals, 1];
  let ys = [0, ...horizontals, 1];

  for (let i = 0; i < xs.length - 1; i++) {
    for (let j = 0; j < ys.length - 1; j++) {
      cells.push({
        x: xs[i],
        y: ys[j],
        w: xs[i + 1] - xs[i],
        h: ys[j + 1] - ys[j]
      });
    }
  }
}

function draw() {
  background(0);

  push();
  scale(s);
  translate(250, 250);

  for (let c of cells) {
    fill(c.col[0], c.col[1], c.col[2]);
    rect(c.x * 500, c.y * 500, c.w * 500, c.h * 500);
  }

  stroke(0);
  strokeWeight(8);

  for (let v of verticals) {
    let x = v * 500;
    line(x, 0, x, 500);
  }

  for (let h of horizontals) {
    let y = h * 500;
    line(0, y, 500, y);
  }

  pop();

  noLoop();
}

function mousePressed() {
  generate();
}
