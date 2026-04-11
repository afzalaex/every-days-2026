const BASE = 1000;
let s = 1;

const MID = BASE / 2;
const ART = 500;
const HALF = ART / 2;

const SIZE = 15;
const COLS = ART / SIZE;
const ROWS = ART / SIZE;

let grid = [];

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}

function mousePressed() {
  generate();
}

function generate() {
  grid = [];

  for (let y = 0; y < ROWS; y++) {
    let row = [];

    for (let x = 0; x < COLS; x++) {
      
      let left = x > 0 ? row[x - 1].right : floor(random(2));
      let top = y > 0 ? grid[y - 1][x].bottom : floor(random(2));

      let right = floor(random(2));
      let bottom = floor(random(2));

      row.push({ left, top, right, bottom });
    }

    grid.push(row);
  }
}

function draw() {
  background(0);

  scale(s);
  translate(MID - HALF, MID - HALF);

  strokeWeight(2);
  noFill();

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {

      let cell = grid[y][x];

      let px = x * SIZE;
      let py = y * SIZE;

      let r = 155 + ((x * 37 + y * 17) % 100);
      let g = 155 + ((x * 73 + y * 31) % 100);
      let b = 155 + ((x * 19 + y * 47) % 100);

      stroke(r, g, b);

      if (cell.left)   line(px, py + SIZE/2, px + SIZE/2, py + SIZE/2);
      if (cell.right)  line(px + SIZE/2, py + SIZE/2, px + SIZE, py + SIZE/2);
      if (cell.top)    line(px + SIZE/2, py, px + SIZE/2, py + SIZE/2);
      if (cell.bottom) line(px + SIZE/2, py + SIZE/2, px + SIZE/2, py + SIZE);
    }
  }
}