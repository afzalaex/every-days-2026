const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s = 1;

const LATTICE = 30;

let colColors = [];

let mx = 0.5;
let my = 0.5;

function computeCanvas() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
  createCanvas(BASE * s, BASE * s);
  pixelDensity(1);
}

function windowResized() {
  computeCanvas();
  redraw();
}

function setup() {
  computeCanvas();
  generateColors();
  noLoop();
}

function generateColors() {
  colColors = [];
  for (let i = 0; i < LATTICE; i++) {
    colColors.push(color(
      random(155,255),
      random(155,255),
      random(155,255)
    ));
  }
}

function draw() {
  background(0);

  push();
  scale(s);
  translate(BASE/2, BASE/2);

  strokeWeight(2 / s);
  noFill();

  updateInteraction();
  drawMatrix();

  pop();
}

function updateInteraction() {
  let lx = (mouseX / s) - BASE/2;
  let ly = (mouseY / s) - BASE/2;

  let inside =
    lx >= -HALF && lx <= HALF &&
    ly >= -HALF && ly <= HALF;

  if (inside) {
    mx = map(lx, -HALF, HALF, -1, 1);
    my = map(ly, -HALF, HALF, -1, 1);
  }
}

function drawMatrix() {

  let step = ART / (LATTICE - 1);

  for (let j = 0; j < LATTICE; j++) {
    for (let i = 0; i < LATTICE; i++) {

      let x = -HALF + i * step;
      let y = -HALF + j * step;

      stroke(colColors[i]);

      let flip = (i + j) % 2 === 0;

      let dirX = flip ? 1 : -1;
      let dirY = flip ? 1 : -1;

      line(x, y, x + step * mx * dirX, y);
      line(x, y, x, y + step * my * dirY);
    }
  }
}

function mouseMoved() {
  redraw();
}









