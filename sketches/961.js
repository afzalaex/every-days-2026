const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const FRAME_COUNT = 10;
const LINE_WEIGHT = 4;

let viewScale;
let frames = [];

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();
  generate();
}

function draw() {
  background(0);

  push();
  translate(OFFSET * viewScale, OFFSET * viewScale);
  scale(viewScale);

  strokeWeight(LINE_WEIGHT);
  strokeJoin(MITER);
  noFill();

  for (let f of frames) {
    stroke(f.stroke);

    beginShape();

    for (let p of f.points) {
      vertex(p.x, p.y);
    }

    endShape(CLOSE);

    if (f.fill) {
      noStroke();
      fill(f.fill);

      beginShape();

      for (let p of f.inner) {
        vertex(p.x, p.y);
      }

      endShape(CLOSE);

      stroke(f.stroke);
      noFill();
    }
  }

  pop();
}

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function generate() {
  randomSeed(floor(random(100000)));

  frames = [];

  for (let i = 0; i < FRAME_COUNT; i++) {
    let margin = 18 + i * 23;

    let w = ART - margin * 2;
    let h = ART - margin * 2;

    let skew = random(-12, 12);
    let shiftX = random(-18, 18);
    let shiftY = random(-18, 18);

    let x = margin + shiftX;
    let y = margin + shiftY;

    let points = [
      { x: x + skew, y: y },
      { x: x + w, y: y + random(-8, 8) },
      { x: x + w + random(-10, 10), y: y + h },
      { x: x, y: y + h + random(-8, 8) },
    ];

    let thickness = random(7, 22);

    let inner = [
      {
        x: points[0].x + thickness,
        y: points[0].y + thickness,
      },
      {
        x: points[1].x - thickness,
        y: points[1].y + thickness,
      },
      {
        x: points[2].x - thickness,
        y: points[2].y - thickness,
      },
      {
        x: points[3].x + thickness,
        y: points[3].y - thickness,
      },
    ];

    let useFill = random() < 0.45;

    frames.push({
      points: points,
      inner: inner,
      stroke: randomBrightColor(),
      fill: useFill ? randomBrightColor() : null,
    });
  }
}

function randomBrightColor() {
  return color(random(155, 255), random(155, 255), random(155, 255));
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  redraw();
}
