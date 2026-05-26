const BASE = 1000;
const ART = 500;

let s;
let grid = [];
let colors = [];
let cols = 35;
let rows = 35;
let cell;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  cell = ART / cols;
  generate();
}

function generate() {
  grid = [];
  colors = [];

  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    colors[y] = [];
    for (let x = 0; x < cols; x++) {
      grid[y][x] = random() < 0.28 ? 1 : 0;
      colors[y][x] = color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      );
    }
  }

  for (let step = 0; step < 8; step++) {
    let next = [];
    for (let y = 0; y < rows; y++) {
      next[y] = [];
      for (let x = 0; x < cols; x++) {
        let count = 0;
        for (let yy = -1; yy <= 1; yy++) {
          for (let xx = -1; xx <= 1; xx++) {
            if (xx == 0 && yy == 0) continue;
            let nx = x + xx;
            let ny = y + yy;
            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
              count += grid[ny][nx];
            }
          }
        }
        next[y][x] = (count == 3 || count == 4) ? 1 : 0;
      }
    }
    grid = next;
  }
}

function draw() {
  background(0);
  push();
  scale(s);

  let ox = (BASE - ART) / 2;
  let oy = (BASE - ART) / 2;
  let mx = mouseX / s;
  let my = mouseY / s;

  strokeWeight(2);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!grid[y][x]) continue;

      let px = ox + x * cell + cell / 2;
      let py = oy + y * cell + cell / 2;
      let d = dist(mx, my, px, py);
      let nearby = d < 120;
      let c = colors[y][x];

      // fully opaque color
      stroke(red(c), green(c), blue(c));

      let dirs = [];
      if (x < cols - 1 && grid[y][x + 1])           dirs.push([1, 0]);
      if (y < rows - 1 && grid[y + 1][x])             dirs.push([0, 1]);
      if (x < cols - 1 && y < rows - 1 && grid[y + 1][x + 1]) dirs.push([1, 1]);
      if (nearby && x > 0 && y < rows - 1 && grid[y + 1][x - 1]) dirs.push([-1, 1]);

      for (let dir of dirs) {
        let amt = nearby ? 1.5 : 1;
        line(
          px, py,
          px + dir[0] * cell * amt,
          py + dir[1] * cell * amt
        );
      }
    }
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}