const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

let palette = [];
let rectangles = [];
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
  background(0);

  palette = [];
  rectangles = [];

  for (let i = 0; i < 4; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  let splitX = random(0.3, 0.7);
  let splitY = random(0.3, 0.7);

  let leftW = ART * splitX;
  let rightW = ART - leftW;

  let topH = ART * splitY;
  let bottomH = ART - topH;

  rectangles = [
    { x: 0, y: 0, w: leftW, h: topH, filled: true },
    { x: leftW, y: 0, w: rightW, h: topH, filled: false },
    { x: 0, y: topH, w: leftW, h: bottomH, filled: false },
    { x: leftW, y: topH, w: rightW, h: bottomH, filled: true },
  ];

  push();

  scale(viewScale);
  translate(OFFSET, OFFSET);

  noStroke();

  const thickness = 20;

  for (let i = 0; i < rectangles.length; i++) {
    let r = rectangles[i];

    fill(palette[i]);
    rect(r.x, r.y, r.w, r.h);

    if (!r.filled) {
      fill(0);
      rect(
        r.x + thickness,
        r.y + thickness,
        r.w - thickness * 2,
        r.h - thickness * 2
      );
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
  generate();
}
