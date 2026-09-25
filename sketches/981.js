const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const POINT_COUNT = 420;
const CIRCLE_RADIUS = 235;
const STROKE_WEIGHT = 1.5;

let palette = [];
let viewScale;

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);

  strokeCap(SQUARE);
  strokeJoin(MITER);

  noLoop();

  generate();
}

function generate() {
  background(0);

  palette = [];

  for (let i = 0; i < 100; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  push();

  scale(viewScale);

  translate(OFFSET + ART / 2, OFFSET + ART / 2);

  let points = [];

  for (let i = 0; i < POINT_COUNT; i++) {
    let angle = map(i, 0, POINT_COUNT, 0, TWO_PI);

    let radiusVariation = CIRCLE_RADIUS + random(-2, 2);

    points.push({
      x: cos(angle) * radiusVariation,
      y: sin(angle) * radiusVariation,
    });
  }

  let hubCount = int(random(2, 5));
  let hubs = [];

  for (let i = 0; i < hubCount; i++) {
    let angle = random(TWO_PI);
    let hubDistance = random(50, 150);

    hubs.push({
      x: cos(angle) * hubDistance,
      y: sin(angle) * hubDistance,
    });
  }

  strokeWeight(STROKE_WEIGHT);

  for (let h = 0; h < hubs.length; h++) {
    let start = floor(random(POINT_COUNT));

    let span = floor(random(POINT_COUNT * 0.18, POINT_COUNT * 0.45));

    let direction = random() < 0.5 ? 1 : -1;

    let twist = random(0.15, 0.65);
    let shift = random(45, 180);

    for (let j = 0; j < span; j++) {
      let index = (start + j * direction) % POINT_COUNT;

      if (index < 0) {
        index += POINT_COUNT;
      }

      let p = points[index];

      let progress = j / span;

      let destinationShift = shift + sin(progress * PI) * random(-80, 80);

      let destination =
        floor(index + destinationShift + j * twist) % POINT_COUNT;

      if (destination < 0) {
        destination += POINT_COUNT;
      }

      let q = points[destination];

      if (random() < 0.12) {
        destination =
          floor(index - destinationShift * random(0.4, 1.4)) % POINT_COUNT;

        if (destination < 0) {
          destination += POINT_COUNT;
        }

        q = points[destination];
      }

      let c = palette[floor(random(palette.length))];

      stroke(red(c), green(c), blue(c));

      line(p.x, p.y, q.x, q.y);
    }
  }

  let extraLines = int(random(20, 70));

  for (let i = 0; i < extraLines; i++) {
    let a = floor(random(POINT_COUNT));
    let b = floor(random(POINT_COUNT));

    let p = points[a];
    let q = points[b];

    let c = palette[floor(random(palette.length))];

    stroke(red(c), green(c), blue(c));

    line(p.x, p.y, q.x, q.y);
  }

  pop();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generate();
}

function mousePressed() {
  generate();
}
