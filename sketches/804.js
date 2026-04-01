const BASE = 1000;
let s = 1;

let grid = 60;
let cell;

let colorGrid = [];
let stateGrid = [];

let offsetX = 0;
let offsetY = 0;

let startMouse;
let startOffsetX, startOffsetY;

let isDragging = false;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noStroke();

  cell = 500 / grid;

  generateSystem();
}

function computeScale() {
  s = min(windowWidth, windowHeight) / BASE;
  s = min(s, 1);
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}

function generateSystem() {
  for (let i = 0; i < grid; i++) {
    colorGrid[i] = [];
    stateGrid[i] = [];

    for (let j = 0; j < grid; j++) {

      colorGrid[i][j] = [
        random(155, 255),
        random(155, 255),
        random(155, 255)
      ];

      let v = ((i + (j % 2 === 0 ? j : -j)) % 4 < 2) ? 1 : 0;

      stateGrid[i][j] = v;
    }
  }
}

function wrap(v, max) {
  return (v % max + max) % max;
}

function draw() {
  background(0);

  scale(s);
  translate(BASE / 2, BASE / 2);

  let halfRange = 250;
  let buffer = 2;

  for (let i = -buffer; i < grid + buffer; i++) {
    for (let j = -buffer; j < grid + buffer; j++) {

      let gx = wrap(i + offsetX, grid);
      let gy = wrap(j + offsetY, grid);

      let x = -halfRange + i * cell;
      let y = -halfRange + j * cell;

      if (x >= -250 && x < 250 && y >= -250 && y < 250) {

        if (stateGrid[gx][gy] === 1) {
          let c = colorGrid[gx][gy];
          fill(c[0], c[1], c[2]);
          rect(x, y, cell, cell);
        }
      }
    }
  }
}

function mousePressed() {
  let mx = mouseX / s - BASE / 2;
  let my = mouseY / s - BASE / 2;

  if (mx >= -250 && mx <= 250 && my >= -250 && my <= 250) {
    isDragging = true;

    startMouse = createVector(mouseX, mouseY);
    startOffsetX = offsetX;
    startOffsetY = offsetY;
  } else {
    isDragging = false;
  }
}

function mouseDragged() {
  if (!isDragging) return;

  let dx = (mouseX - startMouse.x) / (cell * s);
  let dy = (mouseY - startMouse.y) / (cell * s);

  offsetX = round(startOffsetX - dx);
  offsetY = round(startOffsetY - dy);

  redraw();
}

function mouseReleased() {
  isDragging = false;
}