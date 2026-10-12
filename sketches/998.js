const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

let palette = [];
let blocks = [];
let viewScale;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generate();
}

function generate() {
  palette = [];
  blocks = [];

  for (let i = 0; i < 25; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  let y = 0;

  while (y < ART) {
    let bandH = min(random(35, 110), ART - y);
    let cursorX = 0;

    while (cursorX < ART) {
      let w = min(random(35, 145), ART - cursorX);

      blocks.push({
        x: cursorX,
        y: y,
        w: w,
        h: bandH,
        col: random(palette),
        cut: random() < 0.45,
        vertical: random() < 0.5,
        split: random(0.3, 0.7),
      });

      cursorX += w;
    }

    y += bandH;
  }

  for (let b of blocks) {
    if (random() < 0.2) {
      b.col = color(0);
    }
  }

  redraw();
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  noStroke();

  for (let b of blocks) {
    fill(b.col);

    if (b.cut && b.w > 45 && b.h > 35) {
      if (b.vertical) {
        let split = b.split * b.w;

        rect(b.x, b.y, split, b.h);

        rect(b.x + split, b.y + b.h * 0.2, b.w - split, b.h * 0.8);
      } else {
        let split = b.split * b.h;

        rect(b.x, b.y, b.w, split);

        rect(b.x + b.w * 0.2, b.y + split, b.w * 0.8, b.h - split);
      }
    } else {
      rect(b.x, b.y, b.w, b.h);
    }
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
