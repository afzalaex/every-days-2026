const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const SPACING = 7;
const SEGMENT = 5;

let viewScale;
let attractors = [];
let field = [];

function computeScale() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);

  strokeCap(SQUARE);
  noLoop();

  generate();
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(OFFSET, OFFSET);

  noFill();

  for (let s of field) {
    stroke(s.c);
    strokeWeight(s.weight);

    line(s.x1, s.y1, s.x2, s.y2);
  }

  pop();
}

function generate() {
  attractors = [];
  field = [];

  let sourceCount = floor(random(3, 7));

  for (let i = 0; i < sourceCount; i++) {
    attractors.push({
      x: random(70, ART - 70),
      y: random(70, ART - 70),
      strength: random(40, 110) * random([-1, 1]),
    });
  }

  for (let y = SPACING / 2; y < ART; y += SPACING) {
    for (let x = SPACING / 2; x < ART; x += SPACING) {
      let vx = 1;
      let vy = 0;

      for (let source of attractors) {
        let dx = source.x - x;
        let dy = source.y - y;

        let d2 = dx * dx + dy * dy;
        d2 = max(d2, 150);

        let distValue = sqrt(d2);
        let force = source.strength / d2;

        vx += (dx / distValue) * force * 170;
        vy += (dy / distValue) * force * 170;
      }

      let vectorSize = sqrt(vx * vx + vy * vy);

      vx /= vectorSize;
      vy /= vectorSize;

      let px = x;
      let py = y;

      for (let source of attractors) {
        let dx = source.x - x;
        let dy = source.y - y;

        let distValue = sqrt(dx * dx + dy * dy);
        distValue = max(distValue, 10);

        let warp = source.strength / distValue;

        px += (dx / distValue) * warp * 0.22;
        py += (dy / distValue) * warp * 0.22;
      }

      let segmentLength = SEGMENT * random(0.7, 1.5);

      field.push({
        x1: px - vx * segmentLength,
        y1: py - vy * segmentLength,
        x2: px + vx * segmentLength,
        y2: py + vy * segmentLength,

        weight: random(1, 3),

        c: color(random(155, 255), random(155, 255), random(155, 255)),
      });
    }
  }
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
}
