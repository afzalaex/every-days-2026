const BASE = 1000;
const ART = 500;

let viewScale;
let colors = [];

const STEP = 40;
const HALF = ART / 2;

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
}

function setup() {
  computeCanvas();
  strokeWeight(2);
  noFill();
  colorMode(RGB, 255);

  generateColors();
}

function windowResized() {
  computeCanvas();
}

function generateColors() {
  colors = [];

  for (let y = -HALF; y < HALF; y += STEP) {
    let row = [];
    for (let x = -HALF; x < HALF; x += STEP) {
      row.push(color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      ));
    }
    colors.push(row);
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  drawPattern();

  pop();
}

function drawPattern() {
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

      let d = dist(cx, cy, mx, my);

      let t = map(d, 0, ART * 0.5, 1, 0);
      t = constrain(t, 0, 1);

      stroke(colors[yi][xi]);

      drawPureDiagonalCell(x, y, STEP, t);

      xi++;
    }
    yi++;
  }
}

function drawPureDiagonalCell(x, y, s, t) {
  let h = s / 2;

  push();
  translate(x + h, y + h);

  let maxLines = 8;
  let n = floor(lerp(1, maxLines, t));

  let gap = (h * 2) / (n + 1);

  for (let i = 0; i < n; i++) {
    let off = -h + (i + 1) * gap;

    line(-h, off, off, -h);
    line(h, off, off, h);
  }

  if (t > 0.4) {
    let n2 = floor(lerp(0, maxLines, (t - 0.4) / 0.6));
    let gap2 = (h * 2) / (n2 + 1);

    for (let i = 0; i < n2; i++) {
      let off = -h + (i + 1) * gap2;

      line(-h, -off, off, h);
      line(h, -off, off, -h);
    }
  }

  pop();
}





