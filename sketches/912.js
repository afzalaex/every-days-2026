const BASE = 1000;
const ART = 500;
const OFFSET = (BASE - ART) / 2;

let s;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  noLoop();
}

function draw() {
  scale(s / BASE);

  background(0);
  noFill();

  let cols = 20;
  let rows = 20;
  let colWidth = ART / cols;
  let rowHeight = ART / rows;

  translate(OFFSET, OFFSET);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let xOffset = colWidth * i + colWidth / 2;
      let yOffset = rowHeight * j + rowHeight / 2;

      let randomTilt = random(TWO_PI);
      let randomAspectRatio = random(1, 2);

      push();
      translate(xOffset, yOffset);
      rotate(randomTilt);

      stroke(random(155, 255), random(155, 255), random(155, 255));
      strokeWeight(2);

      ellipse(
        0,
        0,
        (colWidth / 2) * randomAspectRatio,
        colWidth / 2 / randomAspectRatio
      );

      pop();
    }
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