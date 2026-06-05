const BASE = 1000;
const ART = 500;

let s;
let voxels = [];

const N = 6;

const ISO_W = ART / (N * 2);
const ISO_H = ISO_W * 0.5;
const ISO_Z = ISO_W;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
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
  voxels = [];

  let grid = [];

  for (let x = 0; x < N; x++) {
    grid[x] = [];
    for (let y = 0; y < N; y++) {
      grid[x][y] = [];
      for (let z = 0; z < N; z++) {
        let d = abs(x - (N - 1) * 0.5) +
                abs(y - (N - 1) * 0.5) +
                abs(z - (N - 1) * 0.5);
        grid[x][y][z] = d < random(4, 7);
      }
    }
  }

  for (let i = 0; i < 80; i++) {
    let x = floor(random(N));
    let y = floor(random(N));
    let z = floor(random(N));
    grid[x][y][z] = false;
  }

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      for (let z = 0; z < N; z++) {
        if (!grid[x][y][z]) continue;

        voxels.push({
          x,
          y,
          z,
          r: random(155, 255),
          g: random(155, 255),
          b: random(155, 255)
        });
      }
    }
  }

  voxels.sort((a, b) => (a.x + a.y + a.z) - (b.x + b.y + b.z));
}

function iso(x, y, z) {
  return {
    x: (x - y) * ISO_W,
    y: (x + y) * ISO_H - z * ISO_Z
  };
}

function drawVoxel(v) {
  let p = iso(v.x, v.y, v.z);

  let topCol = color(v.r, v.g, v.b);
  let leftCol = color(v.r * 0.75, v.g * 0.75, v.b * 0.75);
  let rightCol = color(v.r * 0.55, v.g * 0.55, v.b * 0.55);

  stroke(0);
  strokeWeight(5);

  fill(topCol);
  beginShape();
  vertex(p.x, p.y - ISO_Z);
  vertex(p.x + ISO_W, p.y - ISO_Z + ISO_H);
  vertex(p.x, p.y - ISO_Z + ISO_H * 2);
  vertex(p.x - ISO_W, p.y - ISO_Z + ISO_H);
  endShape(CLOSE);

  fill(leftCol);
  beginShape();
  vertex(p.x - ISO_W, p.y - ISO_Z + ISO_H);
  vertex(p.x, p.y - ISO_Z + ISO_H * 2);
  vertex(p.x, p.y + ISO_H * 2);
  vertex(p.x - ISO_W, p.y + ISO_H);
  endShape(CLOSE);

  fill(rightCol);
  beginShape();
  vertex(p.x + ISO_W, p.y - ISO_Z + ISO_H);
  vertex(p.x, p.y - ISO_Z + ISO_H * 2);
  vertex(p.x, p.y + ISO_H * 2);
  vertex(p.x + ISO_W, p.y + ISO_H);
  endShape(CLOSE);
}

function draw() {
  background(0);

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let v of voxels) {
    let p = iso(v.x, v.y, v.z);
    minX = min(minX, p.x - ISO_W);
    maxX = max(maxX, p.x + ISO_W);
    minY = min(minY, p.y - ISO_Z);
    maxY = max(maxY, p.y + ISO_H * 2);
  }

  let cx = (minX + maxX) * 0.5;
  let cy = (minY + maxY) * 0.5;

  push();
  translate(width / 2, height / 2);
  scale(s);
  translate(-cx, -cy);

  for (let v of voxels) {
    drawVoxel(v);
  }

  pop();
}

function mousePressed() {
  generate();
  redraw();
}