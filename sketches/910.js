const SIZE = 1000;
const ART = 500;
const OFFSET = (SIZE - ART) / 2;

let s;
let seed;

let cell;
let noiseScale;
let maxDist;

let palette = [];
let pts = [];

function computeScale() {
  s = min(windowWidth, windowHeight, SIZE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  noLoop();
  strokeCap(SQUARE);

  seed = floor(random(1000000));
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  randomSeed(seed);
  noiseSeed(seed);

  background(0);

  scale(s / SIZE);

  palette = [];
  pts = [];

  cell = floor(random(10, 50));
  noiseScale = random(0.01, 0.08);
  maxDist = random(2, 25);

  for (let i = 0; i < 128; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  translate(OFFSET, OFFSET);

  for (let y = 0; y <= ART; y += cell) {
    pts.push([]);

    for (let x = 0; x <= ART; x += cell) {
      let a = noise(x * noiseScale, y * noiseScale) * TAU;

      let d = map(
        noise(100 + x * noiseScale, y * noiseScale),
        0,
        1,
        0,
        maxDist
      );

      pts[pts.length - 1].push(createVector(x + cos(a) * d, y + sin(a) * d));
    }
  }

  stroke(0);

  for (let y = 0; y < pts.length - 1; y++) {
    for (let x = 0; x < pts[y].length - 1; x++) {
      let p1 = pts[y][x];
      let p2 = pts[y][x + 1];
      let p3 = pts[y + 1][x + 1];
      let p4 = pts[y + 1][x];

      fill(random(palette));

      beginShape();
      vertex(p1.x, p1.y);
      vertex(p2.x, p2.y);
      vertex(p3.x, p3.y);
      vertex(p4.x, p4.y);
      endShape(CLOSE);
    }
  }
}

function mousePressed() {
  seed = floor(random(1000000));
  redraw();
}