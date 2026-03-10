const BASE = 1000;
const ART = 500;

let viewScale;
let colors = [];

const STEP = 50;
const HALF = ART / 2;
const COLS = Math.floor(ART / STEP);
const ROWS = Math.floor(ART / STEP);

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
}

function setup() {
  computeCanvas();
  noFill();
  strokeWeight(1.5);
  colorMode(RGB, 255);

  generateColors();
}

function windowResized() {
  computeCanvas();
}

function generateColors() {
  colors = [];
  for (let y = 0; y < ROWS; y++) {
    colors[y] = [];
    for (let x = 0; x < COLS; x++) {
      colors[y][x] = color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );
    }
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  drawGrid();

  pop();
}

function drawGrid() {
  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;

  mx = constrain(mx, -HALF, HALF);
  my = constrain(my, -HALF, HALF);

  let yi = 0;
  for (let y = -HALF; y < HALF; y += STEP) {
    let xi = 0;
    for (let x = -HALF; x < HALF; x += STEP) {

      let cx = x + STEP / 2;
      let cy = y + STEP / 2;

      let dx = cx - mx;
      let dy = cy - my;
      let d = sqrt(dx * dx + dy * dy);

      let depth = map(d, 0, ART * 0.7, 8, 1);
      depth = constrain(depth, 1, 8);

      let c = colors[yi][xi];
      stroke(c);

      drawNestedFrame(x, y, STEP, depth);

      xi++;
    }
    yi++;
  }
}

function drawNestedFrame(x, y, size, depth) {
  let margin = size / (depth * 2);

  let px = x;
  let py = y;
  let w = size;
  let h = size;

  for (let i = 0; i < depth; i++) {
    rect(px, py, w, h);

    px += margin;
    py += margin;
    w -= margin * 2;
    h -= margin * 2;
  }
}