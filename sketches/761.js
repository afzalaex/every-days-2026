const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

const EFFECT_RADIUS = 150;

let viewScale = 1;
let cols = 25;
let rows = 25;
let cellSize;
let palette = [];

function computeCanvas() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  createCanvas(BASE * viewScale, BASE * viewScale);
}

function windowResized() {
  computeCanvas();
}

function setup() {
  computeCanvas();
  cellSize = ART / cols;

  for (let i = 0; i < cols * rows; i++) {
    palette.push(color(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    ));
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  let mx = (mouseX / viewScale) - BASE / 2;
  let my = (mouseY / viewScale) - BASE / 2;

  let index = 0;

  for (let x = -cols/2; x < cols/2; x++) {
    for (let y = -rows/2; y < rows/2; y++) {

      let px = x * cellSize;
      let py = y * cellSize;

      if (abs(px) > HALF || abs(py) > HALF) continue;

      let d = dist(px, py, mx, my);
      let state = d < EFFECT_RADIUS ? 1 : 0;

      push();
      translate(px, py);

      stroke(palette[index]);
      strokeWeight(2 * viewScale);

      if (state === 0) {
        line(0, 0, cellSize, cellSize);
      } else {
        line(cellSize, 0, 0, cellSize);
      }

      pop();

      index++;
    }
  }

  pop();
}






