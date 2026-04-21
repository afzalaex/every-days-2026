const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s = 1;

const UNIT = 15;
const CELLS = ART / UNIT;

let phase = 0;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  pixelDensity(1);
  noLoop();
}

function computeScale() {
  s = min(windowWidth, windowHeight) / BASE;
}

function draw() {
  background(0);
  scale(s);
  translate(BASE / 2, BASE / 2);

  strokeWeight(2);

  let blockCount = 50;

  // interaction (safe, non-breaking)
  let mx = constrain(mouseX / s, 0, BASE);
  let my = constrain(mouseY / s, 0, BASE);

  let bias = map(mx, 0, BASE, 0, 1);
  let density = map(my, 0, BASE, 2, 6);

  for (let b = 0; b < blockCount; b++) {

    let gx = floor(((b * 37 + phase * 11) % (CELLS * 0.6)));
    let gy = floor((b * 91 + phase * 7) % CELLS);

    let gw = 12 + (b * 13 + phase) % 16;
    let gh = 8 + (b * 17 + phase) % 14;

    let x = -HALF + gx * UNIT;
    let y = -HALF + gy * UNIT;

    let w = gw * UNIT;
    let h = gh * UNIT;

    if (x + w > HALF) w = HALF - x;
    if (y + h > HALF) h = HALF - y;

    drawBlock(x, y, w, h, b, bias, density);
  }
}

function drawBlock(x, y, w, h, b, bias, density) {

  let step = UNIT;

  for (let i = 0; i < w; i += step) {
    for (let j = 0; j < h; j += step) {

      let px = x + i;
      let py = y + j;

      if (px < -HALF || px > HALF || py < -HALF || py > HALF) continue;

      let ii = floor(i / step);
      let jj = floor(j / step);

      let gate = (ii * 3 + jj * 5 + b + phase) % 7;
      if (gate > density) continue;
      
      let baseOrientation = (ii + jj + b + phase) % 2 === 0;

      let horizontal = bias < 0.5 ? baseOrientation : !baseOrientation;

      let r = 155 + ((ii * 23 + b * 11) % 100);
      let g = 155 + ((jj * 29 + b * 7) % 100);
      let bl = 155 + ((ii * jj + b * 13) % 100);

      stroke(r, g, bl);

      if (horizontal) {
        drawDotted(px, py, px + step * 4, py);
      } else {
        drawDotted(px, py, px, py + step * 4);
      }
    }
  }
}

function drawDotted(x1, y1, x2, y2) {
  let dots = 6;

  for (let i = 0; i < dots; i++) {
    let t = i / dots;
    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);

    if (x < -HALF || x > HALF || y < -HALF || y > HALF) continue;

    point(x, y);
  }
}

function mousePressed() {
  phase++;
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}