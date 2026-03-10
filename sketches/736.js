const BASE = 1000;
const ART = 500;

let viewScale;
let colors = [];

const STEP = 15;
const HALF = ART / 2;
const COLS = Math.floor(ART / STEP) + 1;
const ROWS = Math.floor(ART / STEP) + 1;

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
}

function setup() {
  computeCanvas();
  noFill();
  strokeWeight(2);
  colorMode(RGB, 255);

  generateColors();
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

function windowResized() {
  computeCanvas();
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  drawInteractive();

  pop();
}

function drawInteractive() {
  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;

  mx = constrain(mx, -HALF, HALF);
  my = constrain(my, -HALF, HALF);

  let yi = 0;
  for (let y = -HALF; y <= HALF; y += STEP) {
    let xi = 0;
    for (let x = -HALF; x <= HALF; x += STEP) {

      let dx = x - mx;
      let dy = y - my;
      let d = sqrt(dx * dx + dy * dy);

      let a = atan2(dy, dx);
      let m = exp(-d * 0.01) * 30;

      let x2 = x + cos(a) * m;
      let y2 = y + sin(a) * m;

      stroke(colors[yi][xi]);
      line(x, y, x2, y2);

      xi++;
    }
    yi++;
  }
}


