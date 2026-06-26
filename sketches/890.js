const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;
let CELL;
let LAYOUT;
let pixels;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  generate();
  noLoop();
}

function generate() {
  CELL = floor(random(5, 25));
  LAYOUT = floor(ART / CELL);

  pixels = [];
  for (let x = 0; x < LAYOUT; x++) {
    pixels[x] = [];
    for (let y = 0; y < LAYOUT; y++) {
      pixels[x][y] = null;
    }
  }

  let clusters = floor(random(30, 60));

  for (let i = 0; i < clusters; i++) {
    let cx = floor(random(LAYOUT));
    let cy = floor(random(LAYOUT));
    let radius = random(3, 10);

    let c = color(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    );

    growCluster(cx, cy, radius, c);
  }
}

function growCluster(cx, cy, radius, c) {
  let frontier = [[cx, cy]];
  let visited = {};

  while (frontier.length > 0) {
    let index = floor(random(frontier.length));
    let [x, y] = frontier.splice(index, 1)[0];

    let key = x + "," + y;
    if (visited[key]) continue;
    visited[key] = true;

    if (x < 0 || y < 0 || x >= LAYOUT || y >= LAYOUT) continue;
    if (dist(x, y, cx, cy) > radius) continue;

    pixels[x][y] = c;

    if (random() < 0.95) frontier.push([x + 1, y]);
    if (random() < 0.95) frontier.push([x - 1, y]);
    if (random() < 0.95) frontier.push([x, y + 1]);
    if (random() < 0.95) frontier.push([x, y - 1]);
  }
}

function draw() {
  background(0);

  push();
  translate(width / 2, height / 2);
  scale(s);
  translate(-BASE / 2, -BASE / 2);

  let ox = BASE / 2 - HALF;
  let oy = BASE / 2 - HALF;

  stroke(0);
  strokeWeight(max(1, CELL * 0.08));

  for (let x = 0; x < LAYOUT; x++) {
    for (let y = 0; y < LAYOUT; y++) {
      if (pixels[x][y] === null) continue;

      fill(pixels[x][y]);
      rect(
        ox + x * CELL,
        oy + y * CELL,
        CELL,
        CELL
      );
    }
  }
  pop();
}

function mousePressed() {
  generate();
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}