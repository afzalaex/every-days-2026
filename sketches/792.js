const BASE = 1000;
let s = 1;

function setup() {
  computeScale();
  noLoop();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
  createCanvas(s, s);
}

function windowResized() {
  computeScale();
  generate();
}

function draw() {
  generate();
}

function generate() {
  background(0);

  push();
  scale(s / BASE);

  colorMode(RGB, 255);

  const ART = 500;
  const half = ART / 2;
  const originX = BASE / 2 - half;
  const originY = BASE / 2 - half;

  const seeds = 80;
  const maxNodes = 1000;
  const step = 12;

  let palette = [];
  for (let i = 0; i < seeds; i++) {
    palette.push(color(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    ));
  }

  let clusters = [];

  for (let i = 0; i < seeds; i++) {
    clusters.push([
      createVector(
        random(originX, originX + ART),
        random(originY, originY + ART)
      )
    ]);
  }

  for (let c = 0; c < clusters.length; c++) {
    let col = palette[c];

    for (let n = 0; n < maxNodes; n++) {

      let base = random(clusters[c]);
      let dir = floor(random(4));

      let nx = base.x;
      let ny = base.y;

      if (dir === 0) nx += step;
      if (dir === 1) nx -= step;
      if (dir === 2) ny += step;
      if (dir === 3) ny -= step;

      if (
        nx < originX || nx > originX + ART ||
        ny < originY || ny > originY + ART
      ) continue;

      let newNode = createVector(nx, ny);

      let tooClose = false;
      for (let p of clusters[c]) {
        if (p.dist(newNode) < step * 0.9) {
          tooClose = true;
          break;
        }
      }
      if (tooClose) continue;

      clusters[c].push(newNode);

      fill(red(col), green(col), blue(col), 230);
      stroke(0);
      strokeWeight(2);

      rect(nx, ny, step, step);
    }
  }

  pop();
}

function mousePressed() {
  generate();
}