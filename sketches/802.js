const BASE = 1000;
let s = 1;

let grid = 100;
let cell;

let colorGrid = [];

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noStroke();

  cell = 500 / grid;

  generateColors();
}

function computeScale() {
  s = min(windowWidth, windowHeight) / BASE;
  s = min(s, 1);
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}

function generateColors() {
  for (let y = 0; y < grid; y++) {
    colorGrid[y] = [];
    for (let x = 0; x < grid; x++) {
      colorGrid[y][x] = [
        random(155,255),
        random(155,255),
        random(155,255)
      ];
    }
  }
}

function draw() {
  background(0);
  scale(s);

  let artStart = (BASE - 500) / 2;
  let artEnd = artStart + 500;
  let mid = BASE / 2;

  let mx = mouseX / s;
  let my = mouseY / s;

  let inside = (mx >= artStart && mx <= artEnd && my >= artStart && my <= artEnd);

  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {

      let px = artStart + x * cell + cell / 2;
      let py = artStart + y * cell + cell / 2;

      let dx = abs(px - mid);
      let dy = abs(py - mid);
      let v = min(dx, dy);

      let influence = 0;

      if (inside) {
        let dMouse = dist(px, py, mx, my);
        influence = 20 / (dMouse + 50);
      }

      let t = floor((v + influence * 50) / 6);

      if (t % 2 === 0) {

        let c = colorGrid[y][x];

        let r = constrain(c[0] + t * 0.8, 155, 255);
        let g = constrain(c[1] + t * 1.0, 155, 255);
        let b = constrain(c[2] + t * 1.2, 155, 255);

        fill(r, g, b);
        rect(px, py, cell, cell);
      }
    }
  }
}