const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;
let dots = [];

function computeScale() {
  s = Math.min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function generate() {
  dots = [];

  const cols = 55;
  const rows = 55;
  const step = ART / cols;

  let palette = [];
  const paletteSize = floor(random(6, 15));

  for (let i = 0; i < paletteSize; i++) {
    palette.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }

  let colorSources = [];
  const sourceCount = floor(random(30, 80));

  for (let i = 0; i < sourceCount; i++) {
    colorSources.push({
      x: random(-1, 1),
      y: random(-1, 1),
      col: random(palette)
    });
  }

  let fieldTypes = ["radial", "ring", "vortex", "wave", "stripe", "cellular"];
  shuffle(fieldTypes, true);

  let fields = [];
  const activeCount = floor(random(2, 6));

  for (let i = 0; i < activeCount; i++) {
    fields.push({
      type: fieldTypes[i],
      amp: random(0.5, 2),
      freq: random(2, 25),
      cx: random(-0.7, 0.7),
      cy: random(-0.7, 0.7),
      phase: random(TAU)
    });
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const nx = map(x, 0, cols - 1, -1, 1);
      const ny = map(y, 0, rows - 1, -1, 1);

      let v = 0;

      for (let f of fields) {
        if (f.type === "radial") {
          const d = dist(nx, ny, f.cx, f.cy);
          v += cos(d * f.freq + f.phase) * f.amp;
        } 
        else if (f.type === "ring") {
          const d = dist(nx, ny, f.cx, f.cy);
          v += sin(d * f.freq + f.phase) * f.amp;
        } 
        else if (f.type === "vortex") {
          const a = atan2(ny - f.cy, nx - f.cx);
          v += sin(a * f.freq + f.phase) * f.amp;
        } 
        else if (f.type === "wave") {
          v += sin(nx * f.freq + f.phase) * cos(ny * f.freq + f.phase) * f.amp;
        } 
        else if (f.type === "stripe") {
          v += sin((nx + ny) * f.freq + f.phase) * f.amp;
        } 
        else if (f.type === "cellular") {
          v += (noise(nx * f.freq, ny * f.freq) * 2 - 1) * f.amp;
        }
      }

      let r = map(v, -8, 8, 0, step * 1.4);
      r = constrain(r, 0, step * 1.4);

      let nearest = [];
      for (let src of colorSources) {
        nearest.push({
          d: dist(nx, ny, src.x, src.y),
          col: src.col
        });
      }

      nearest.sort((a, b) => a.d - b.d);

      const c1 = nearest[0].col;
      const c2 = nearest[1].col;
      const c3 = nearest[2].col;

      let w1 = 1 / (nearest[0].d + 0.001);
      let w2 = 1 / (nearest[1].d + 0.001);
      let w3 = 1 / (nearest[2].d + 0.001);
      const total = w1 + w2 + w3;

      w1 /= total;
      w2 /= total;
      w3 /= total;

      const finalCol = color(
        red(c1) * w1 + red(c2) * w2 + red(c3) * w3,
        green(c1) * w1 + green(c2) * w2 + green(c3) * w3,
        blue(c1) * w1 + blue(c2) * w2 + blue(c3) * w3
      );

      dots.push({
        x: -HALF + x * step + step * 0.5,
        y: -HALF + y * step + step * 0.5,
        r: r,
        col: finalCol
      });
    }
  }
}

function draw() {
  background(0);

  push();
  translate(width / 2, height / 2);
  scale(s);

  noStroke();

  for (let d of dots) {
    fill(d.col);
    circle(d.x, d.y, d.r);
  }

  pop();
}

function mousePressed() {
  generate();
  redraw();
}