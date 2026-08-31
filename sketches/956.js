const BASE = 1000;
const ART = 500;

let s;
let blocks = [];

const N = 6;

const ISO_W = ART / (N * 2);
const ISO_H = ISO_W * 0.5;
const ISO_Z = ISO_W;

function computeScale() {
  s = min(min(windowWidth, windowHeight), BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);

  generate();
  noLoop();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function generate() {
  blocks = [];

  let levels = floor(random(3, 6));

  for (let z = 0; z < levels; z++) {
    let offset = random() < 0.5 ? 0 : 1;

    for (let y = 0; y < N; y++) {
      if ((y + z + offset) % 2 !== 0) continue;

      let start = floor(random(0, 2));
      let beamLength = floor(random(3, 7));

      beamLength = min(beamLength, N - start);

      blocks.push({
        x: start,
        y,
        z,

        dx: beamLength,
        dy: 1,
        dz: 1,

        r: random(155, 255),
        g: random(155, 255),
        b: random(155, 255),
      });
    }

    for (let x = 0; x < N; x++) {
      if ((x + z + offset) % 2 !== 0) continue;

      let start = floor(random(0, 2));
      let beamLength = floor(random(3, 7));

      beamLength = min(beamLength, N - start);

      blocks.push({
        x,
        y: start,
        z,

        dx: 1,
        dy: beamLength,
        dz: 1,

        r: random(155, 255),
        g: random(155, 255),
        b: random(155, 255),
      });
    }
  }

  let pillars = floor(random(3, 7));

  for (let i = 0; i < pillars; i++) {
    blocks.push({
      x: floor(random(1, N - 1)),
      y: floor(random(1, N - 1)),
      z: 0,

      dx: 1,
      dy: 1,
      dz: floor(random(2, 5)),

      r: random(155, 255),
      g: random(155, 255),
      b: random(155, 255),
    });
  }

  blocks.sort((a, b) => {
    return a.x + a.y + a.z - (b.x + b.y + b.z);
  });
}

function iso(x, y, z) {
  return {
    x: (x - y) * ISO_W,
    y: (x + y) * ISO_H - z * ISO_Z,
  };
}

function drawBlock(b) {
  let p = iso(b.x, b.y, b.z);

  let w = b.dx * ISO_W;
  let d = b.dy * ISO_W;
  let h = b.dz * ISO_Z;

  let top = color(b.r, b.g, b.b);

  let left = color(b.r * 0.68, b.g * 0.68, b.b * 0.68);

  let right = color(b.r * 0.42, b.g * 0.42, b.b * 0.42);

  noStroke();

  // TOP
  fill(top);

  beginShape();

  vertex(p.x, p.y - h);

  vertex(p.x + w, p.y - h + d * 0.5);

  vertex(p.x + w - d, p.y - h + d);

  vertex(p.x - d, p.y - h + d * 0.5);

  endShape(CLOSE);

  // LEFT
  fill(left);

  beginShape();

  vertex(p.x - d, p.y - h + d * 0.5);

  vertex(p.x + w - d, p.y - h + d);

  vertex(p.x + w - d, p.y + d);

  vertex(p.x - d, p.y + d * 0.5);

  endShape(CLOSE);

  // RIGHT
  fill(right);

  beginShape();

  vertex(p.x + w, p.y - h + d * 0.5);

  vertex(p.x + w - d, p.y - h + d);

  vertex(p.x + w - d, p.y + d);

  vertex(p.x + w, p.y + d * 0.5);

  endShape(CLOSE);
}

function draw() {
  background(0);

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let b of blocks) {
    let p = iso(b.x, b.y, b.z);

    let w = b.dx * ISO_W;
    let d = b.dy * ISO_W;
    let h = b.dz * ISO_Z;

    minX = min(minX, p.x - d);
    maxX = max(maxX, p.x + w);

    minY = min(minY, p.y - h);
    maxY = max(maxY, p.y + d);
  }

  let cx = (minX + maxX) * 0.5;
  let cy = (minY + maxY) * 0.5;

  push();

  translate(width / 2, height / 2);

  scale(s);

  translate(-cx, -cy);

  for (let b of blocks) {
    drawBlock(b);
  }

  pop();
}

function mousePressed() {
  generate();
  redraw();
}
