const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

let viewScale = 1;

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

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  let palette = [];

  for (let i = 0; i < 4; i++) {
    palette.push(
      color(
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR),
        random(MIN_COLOR, MAX_COLOR)
      )
    );
  }

  const margin = 45;
  const x0 = margin;
  const y0 = margin;
  const x1 = ART - margin;
  const y1 = ART - margin;

  const cx = lerp(x0, x1, random(0.35, 0.65));
  const cy = lerp(y0, y1, random(0.35, 0.65));

  stroke(0);
  strokeWeight(5);
  strokeJoin(MITER);

  fill(palette[0]);
  beginShape();
  vertex(x0, y0);
  vertex(x1, y0);
  vertex(cx, cy);
  vertex(x0, cy);
  endShape(CLOSE);

  fill(palette[1]);
  beginShape();
  vertex(x1, y0);
  vertex(x1, y1);
  vertex(cx, cy);
  endShape(CLOSE);

  fill(palette[2]);
  beginShape();
  vertex(x1, y1);
  vertex(x0, y1);
  vertex(cx, cy);
  endShape(CLOSE);

  fill(palette[3]);
  beginShape();
  vertex(x0, y1);
  vertex(x0, cy);
  vertex(cx, cy);
  endShape(CLOSE);

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
