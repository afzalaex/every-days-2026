const BASE = 1000;
const ART = 500;

let s;

let blocks = [];
let fills = [];

function setup() {
  computeScale();

  createCanvas(BASE * s, BASE * s);

  colorMode(RGB);

  noLoop();

  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function generate() {

  blocks = [];
  fills = [];

  const maxR = ART / 2;
  const blockCount = 28;

  for (let i = 0; i < blockCount; i++) {

    const w = random(30, 130);
    const h = random(30, 130);

    blocks.push({

      x: random(-maxR, maxR - w),
      y: random(-maxR, maxR - h),

      w: w,
      h: h,

      r: random(155, 255),
      g: random(155, 255),
      b: random(155, 255),
      a: random(120, 255)
    });
  }

  for (let i = 0; i < blockCount * 0.5; i++) {

    const w = random(80, 200);
    const h = random(80, 200);

    fills.push({

      x: random(-maxR, maxR - w),
      y: random(-maxR, maxR - h),

      w: w,
      h: h,

      r: random(155, 255),
      g: random(155, 255),
      b: random(155, 255)
    });
  }
}

function draw() {

  background(0);

  push();

  translate(width / 2, height / 2);
  scale(s);

  for (let i = 0; i < blocks.length; i++) {

    let b = blocks[i];

    noFill();

    stroke(b.r, b.g, b.b, b.a);

    rect(b.x, b.y, b.w, b.h);
  }

  for (let i = 0; i < fills.length; i++) {

    let f = fills[i];

    noStroke();

    fill(f.r, f.g, f.b, 40);

    rect(f.x, f.y, f.w, f.h);
  }

  pop();
}

function mousePressed() {
  generate();
  redraw();
}