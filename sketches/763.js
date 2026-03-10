const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let viewScale = 1;

let cols = 40;
let rows = 40;
let cell;

let grid = [];
let nextGrid = [];
let colors = [];

function computeCanvas() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  createCanvas(BASE * viewScale, BASE * viewScale);
}

function windowResized() {
  computeCanvas();
}

function setup() {
  computeCanvas();
  rectMode(CENTER);

  cell = ART / cols;

  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    nextGrid[i] = [];
    colors[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = random() < 0.15 ? 1 : 0;
      nextGrid[i][j] = 0;

      if (grid[i][j] === 1) {
        colors[i][j] = [
          random(155, 255),
          random(155, 255),
          random(155, 255)
        ];
      } else {
        colors[i][j] = null;
      }
    }
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  noStroke();

  for (let k = 0; k < 40; k++) {
    let i = floor(random(cols));
    let j = floor(random(rows));

    grid[i][j] = 1;
    colors[i][j] = [
      random(155, 255),
      random(155, 255),
      random(155, 255)
    ];
  }

  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {

      let neighbors = 0;

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          neighbors += grid[i + dx][j + dy];
        }
      }

      if (grid[i][j] === 1) {
        nextGrid[i][j] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
      } else {
        nextGrid[i][j] = (neighbors === 3) ? 1 : 0;
      }
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      if (nextGrid[i][j] === 1 && grid[i][j] === 0) {
        colors[i][j] = [
          random(155, 255),
          random(155, 255),
          random(155, 255)
        ];
      }

      grid[i][j] = nextGrid[i][j];

      if (grid[i][j] === 1) {
        let x = -HALF + i * cell;
        let y = -HALF + j * cell;

        fill(colors[i][j][0], colors[i][j][1], colors[i][j][2]);
        rect(x, y, cell * 0.4, cell * 1);
      }
    }
  }

  pop();
}









