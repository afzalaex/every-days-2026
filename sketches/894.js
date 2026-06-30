const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  strokeCap(SQUARE);
  noFill();
  noLoop();
}

function draw() {
  push();
  scale(s / BASE);
  
  background(0);
  translate(BASE / 2, BASE / 2);

  let palette = [];
  for (let i = 0; i < 6; i++) {
    palette.push(
      color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      )
    );
  }

  let cols = floor(random(8, 32));
  let rows = cols;
  let cell = ART / cols;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      push();
      
      translate(
        -HALF + x * cell + cell / 2,
        -HALF + y * cell + cell / 2
      );

      stroke(random(palette));
      strokeWeight(2);

      relay(cell);
      
      pop();
    }
  }

  pop();
}

function relay(size) {
  let e = size / 2;

  rotate(HALF_PI * floor(random(4)));

  let top = random() < 0.5;
  let right = random() < 0.5;
  let bottom = random() < 0.5;
  let left = random() < 0.5;

  if (!top && !right && !bottom && !left) {
    let r = floor(random(4));
    if (r === 0) top = true;
    if (r === 1) right = true;
    if (r === 2) bottom = true;
    if (r === 3) left = true;
  }

  if (top) line(0, 0, 0, -e);
  if (right) line(0, 0, e, 0);
  if (bottom) line(0, 0, 0, e);
  if (left) line(0, 0, -e, 0);

  if (top && right) line(0, -e, e, 0);
  if (right && bottom) line(e, 0, 0, e);
  if (bottom && left) line(0, e, -e, 0);
  if (left && top) line(-e, 0, 0, -e);

  if (random() < 0.3) line(-e, 0, e, 0);
  if (random() < 0.3) line(0, -e, 0, e);

  if (random() < 0.15) line(-e, -e, e, e);
  if (random() < 0.15) line(-e, e, e, -e);

  if (random() < 0.08) {
    rectMode(CENTER);
    rect(0, 0, size, size);
  }
}

function mousePressed() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}