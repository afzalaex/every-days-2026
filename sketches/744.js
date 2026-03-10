const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

const STEP = 40;
const DEPTH = 20;            
const EFFECT_RADIUS = 150;

const SCALE_PUSH = 0;    

let viewScale = 1;
let cells = [];

function setup() {
  computeCanvas();
  initCells();
}

function windowResized() {
  computeCanvas();
}

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
}

function initCells() {
  cells = [];

  let h = STEP * Math.sqrt(3) / 2;
  let cols = floor(ART / STEP) + 2;
  let rows = floor(ART / h) + 2;

  let id = 0;

  let gridW = (cols - 1) * STEP;
let gridH = (rows - 1) * h;

for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    let x =
      -gridW / 2 +
      i * STEP +
      (j % 2) * STEP * 0.5;

    let y =
      -gridH / 2 +
      j * h;

    cells.push({
        id: id++,          
        x, y,
        z: 0,
        vz: 0,
        s: 1,
        vs: 0,
        col: [
          random(155, 255),
          random(155, 255),
          random(155, 255)
        ]
      });
    }
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;

  cells.sort((a, b) => {
    let da = a.y + a.z;
    let db = b.y + b.z;
    return da === db ? a.id - b.id : da - db;
  });

  stroke(0);
  strokeWeight(2);

  for (let c of cells) {
    let d = dist(mx, my, c.x, c.y);
    let active = d < EFFECT_RADIUS;

    let targetZ = active ? DEPTH : 0;
    c.vz += (targetZ - c.z) * 0.16;
    c.vz *= 0.65;
    c.z += c.vz;
    c.z = constrain(c.z, 0, DEPTH);

    let targetS = active ? 1 + SCALE_PUSH : 1;
    c.vs += (targetS - c.s) * 0.14;
    c.vs *= 0.65;
    c.s += c.vs;

    drawExtrudedCell(c);
  }

  pop();
}

function drawExtrudedCell(c) {
  let s = STEP * c.s;
  let h = s * Math.sqrt(3) / 2;
  let z = c.z;

  let top = c.col;
  let sideA = c.col.map(v => max(0, v - 35));
  let sideB = c.col.map(v => max(0, v - 65));

  fill(top[0], top[1], top[2]);
  quad(
    c.x, c.y - h - z,
    c.x + s * 0.5, c.y - h * 0.5 - z,
    c.x, c.y - z,
    c.x - s * 0.5, c.y - h * 0.5 - z
  );

  fill(sideA[0], sideA[1], sideA[2]);
  quad(
    c.x + s * 0.5, c.y - h * 0.5 - z,
    c.x + s * 0.5, c.y - h * 0.5,
    c.x, c.y,
    c.x, c.y - z
  );

  fill(sideB[0], sideB[1], sideB[2]);
  quad(
    c.x - s * 0.5, c.y - h * 0.5 - z,
    c.x - s * 0.5, c.y - h * 0.5,
    c.x, c.y,
    c.x, c.y - z
  );
}








