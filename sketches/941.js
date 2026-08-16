const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

const COUNT = 100;

let pieces = [];
let viewScale;

function computeScale() {
  viewScale = Math.min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  noLoop();
  generate();
}

function draw() {
  background(0);

  push();

  scale(viewScale);
  translate(OFFSET, OFFSET);

  noStroke();

  for (let p of pieces) {
    fill(p.c);

    beginShape();

    for (let v of p.vertices) {
      vertex(v.x, v.y);
    }

    endShape(CLOSE);
  }

  pop();
}

function generate() {
  pieces = [];

  let palette = [];

  for (let i = 0; i < 8; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  let x = ART / 2;
  let y = ART / 2;
  let angle = 0;

  for (let i = 0; i < COUNT; i++) {
    let w = random(12, 38);
    let h = random(12, 38);

    let nextAngle = angle;

    if (random() < 0.35) {
      nextAngle += random([-HALF_PI, HALF_PI]);
    }

    let dx = cos(nextAngle);
    let dy = sin(nextAngle);

    let p1 = {
      x: x,
      y: y,
    };

    let p2 = {
      x: x + dx * w,
      y: y + dy * w,
    };

    let px = -dy;
    let py = dx;

    let p3 = {
      x: p2.x + px * h,
      y: p2.y + py * h,
    };

    let p4 = {
      x: x + px * h,
      y: y + py * h,
    };

    pieces.push({
      vertices: [p1, p2, p3, p4],
      c: random(palette),
    });

    x = p3.x;
    y = p3.y;
    angle = nextAngle;

    if (x < 20 || x > ART - 20 || y < 20 || y > ART - 20) {
      x = ART / 2;
      y = ART / 2;
      angle += PI;
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

  redraw();
}
