const BASE = 1000;
const ART = 500;

let viewScale;
let colors = [];

const STEP = 25;
const HALF = ART / 2;
const CONNECT_RADIUS = ART * 0.4;
const DOT_RADIUS = 6;

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
}

function setup() {
  computeCanvas();
  colorMode(RGB, 255);
  generateColors();
}

function windowResized() {
  computeCanvas();
}

function generateColors() {
  colors = [];

  for (let y = -HALF; y <= HALF; y += STEP) {
    let row = [];
    for (let x = -HALF; x <= HALF; x += STEP) {
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

  drawDotsAndConnections();

  pop();
}

function drawDotsAndConnections() {
  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;

  mx = constrain(mx, -HALF, HALF);
  my = constrain(my, -HALF, HALF);

  let yi = 0;
  for (let y = -HALF; y <= HALF; y += STEP) {
    let xi = 0;
    for (let x = -HALF; x <= HALF; x += STEP) {

      let cx = x;
      let cy = y;

      let d = dist(cx, cy, mx, my);

      let active = d < CONNECT_RADIUS;

      let c = colors[yi][xi];

      noStroke();
      fill(c);
      circle(cx, cy, DOT_RADIUS);

      if (active) {
        stroke(c);
        strokeWeight(2);

        if (x + STEP <= HALF) {
          line(cx, cy, cx + STEP, cy);
        }

        if (y + STEP <= HALF) {
          line(cx, cy, cx, cy + STEP);
        }

        if (x + STEP <= HALF && y + STEP <= HALF) {
          line(cx, cy, cx + STEP, cy + STEP);
        }

        if (x - STEP >= -HALF && y + STEP <= HALF) {
          line(cx, cy, cx - STEP, cy + STEP);
        }
      }

      xi++;
    }
    yi++;
  }
}







