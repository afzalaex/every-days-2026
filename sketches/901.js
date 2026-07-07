const BASE = 1000;
const ART = 500;

let s;

let COLS;
let ROWS;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);

  stroke(0);
  strokeWeight(2);
  strokeCap(SQUARE);

  noLoop();

  regenerate();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function regenerate() {
  COLS = floor(random(5, 26));
  ROWS = floor(random(5, 26));
}

function draw() {
  background(0);

  push();
  scale(s / BASE);

  translate((BASE - ART) / 2, (BASE - ART) / 2);

  let cw = ART / COLS;
  let ch = ART / ROWS;

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let px = x * cw;
      let py = y * ch;

      let cx = px + cw / 2;
      let cy = py + ch / 2;

      let a = floor(noise(x * 0.12, y * 0.12) * 4);

      fill(random(155, 255), random(155, 255), random(155, 255));

      beginShape();

      if (a === 0) {
        vertex(px, py);
        vertex(px + cw, py);
        vertex(cx, cy);
      } else if (a === 1) {
        vertex(px + cw, py);
        vertex(px + cw, py + ch);
        vertex(cx, cy);
      } else if (a === 2) {
        vertex(px + cw, py + ch);
        vertex(px, py + ch);
        vertex(cx, cy);
      } else {
        vertex(px, py + ch);
        vertex(px, py);
        vertex(cx, cy);
      }

      endShape(CLOSE);

      fill(random(155, 255), random(155, 255), random(155, 255));

      beginShape();

      if (a === 0) {
        vertex(px + cw, py);
        vertex(px + cw, py + ch);
        vertex(cx, cy);
      } else if (a === 1) {
        vertex(px + cw, py + ch);
        vertex(px, py + ch);
        vertex(cx, cy);
      } else if (a === 2) {
        vertex(px, py + ch);
        vertex(px, py);
        vertex(cx, cy);
      } else {
        vertex(px, py);
        vertex(px + cw, py);
        vertex(cx, cy);
      }

      endShape(CLOSE);
    }
  }

  pop();
}

function mousePressed() {
  regenerate();
  redraw();
}