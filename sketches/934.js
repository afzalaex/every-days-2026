const BASE = 1000;
const ART = 500;
const OFFSET = (BASE - ART) / 2;

const GRID_SIZE = 100;
const CELL = ART / GRID_SIZE;

let viewScale;
let cells = [];

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * viewScale, BASE * viewScale);
  noLoop();
  generate();
}

function draw() {
  background(0);

  push();
  scale(viewScale);

  for (let c of cells) {
    let tone = random(155, 255);
    let mode = floor(random(4));

    if (mode === 0) {
      fill(tone, tone, tone);
    } else if (mode === 1) {
      fill(tone, random(155, 255), random(155, 255));
    } else if (mode === 2) {
      fill(random(155, 255), tone, random(155, 255));
    } else {
      fill(random(155, 255), random(155, 255), tone);
    }

    noStroke();

    rect(OFFSET + c.x * CELL, OFFSET + c.y * CELL, c.w * CELL, c.h * CELL);
  }

  pop();
}

function generate() {
  cells = [
    {
      x: 0,
      y: 0,
      w: GRID_SIZE,
      h: GRID_SIZE,
    },
  ];

  for (let i = 0; i < 75; i++) {
    let index = floor(random(cells.length));
    let c = cells[index];

    if (c.w < 3 || c.h < 3) {
      continue;
    }

    let vertical = random() < 0.5;

    if (vertical) {
      let cut = floor(random(c.w * 0.25, c.w * 0.75));

      let a = {
        x: c.x,
        y: c.y,
        w: cut,
        h: c.h,
      };

      let b = {
        x: c.x + cut,
        y: c.y,
        w: c.w - cut,
        h: c.h,
      };

      cells.splice(index, 1, a, b);
    } else {
      let cut = floor(random(c.h * 0.25, c.h * 0.75));

      let a = {
        x: c.x,
        y: c.y,
        w: c.w,
        h: cut,
      };

      let b = {
        x: c.x,
        y: c.y + cut,
        w: c.w,
        h: c.h - cut,
      };

      cells.splice(index, 1, a, b);
    }
  }

  redraw();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * viewScale, BASE * viewScale);
  redraw();
}
