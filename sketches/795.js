const BASE = 1000;
let s;

let cells = 12;
let cellSize;

function setup() {
  computeScale();
  noLoop();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
  createCanvas(s, s);
  cellSize = 500 / cells;
}

function windowResized() {
  computeScale();
  redraw();
}

function mousePressed() {
  redraw();
}

function draw() {
  background(0);

  push();
  scale(s / BASE);
  translate(BASE / 2 - 250, BASE / 2 - 250);

  stroke(0);
  strokeWeight(2);

  rectMode(CENTER);

  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {

      let x = i * cellSize;
      let y = j * cellSize;

      push();
      translate(x + cellSize / 2, y + cellSize / 2);

      let w = cellSize;
      let h = cellSize;

      let c1 = color(random(155,255), random(155,255), random(155,255));
      let c2 = color(random(155,255), random(155,255), random(155,255));

      if (random() < 0.08) c2 = c1;

      let mode = floor(random(8));

      if (mode === 0) {
        fill(c1);
        triangle(-w/2, -h/2, w/2, -h/2, -w/2, h/2);
        fill(c2);
        triangle(w/2, h/2, w/2, -h/2, -w/2, h/2);

      } else if (mode === 1) {
        fill(c1);
        triangle(-w/2, -h/2, w/2, -h/2, w/2, h/2);
        fill(c2);
        triangle(-w/2, -h/2, -w/2, h/2, w/2, h/2);

      } else if (mode === 2) {
        fill(c1);
        rect(-w/4, 0, w/2, h);
        fill(c2);
        rect(w/4, 0, w/2, h);

      } else if (mode === 3) {
        fill(c1);
        rect(0, -h/4, w, h/2);
        fill(c2);
        rect(0, h/4, w, h/2);

      } else if (mode === 4) {
        fill(c1);
        rect(-w/3, 0, w/3, h);
        fill(c2);
        rect(0, 0, w/3, h);
        fill(c1);
        rect(w/3, 0, w/3, h);

      } else if (mode === 5) {
        fill(c1);
        rect(0, -h/3, w, h/3);
        fill(c2);
        rect(0, 0, w, h/3);
        fill(c1);
        rect(0, h/3, w, h/3);

      } else if (mode === 6) {
        fill(c1);
        rect(-w/4, -h/4, w/2, h/2);
        rect(w/4, h/4, w/2, h/2);
        fill(c2);
        rect(w/4, -h/4, w/2, h/2);
        rect(-w/4, h/4, w/2, h/2);

      } else if (mode === 7) {
        fill(c1);
        rect(0, 0, w, h);
        fill(c2);
        rect(0, 0, w * 0.5, h * 0.5);
      }

      pop();
    }
  }

  pop();
}