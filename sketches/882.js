const BASE = 1000;

let s;
let curves = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  strokeCap(SQUARE);
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}

function generate() {
  curves = [];

  let palette = [];
  for (let i = 0; i < 100; i++) {
    palette.push(
      color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      )
    );
  }

  for (let i = 0; i < 200; i++) {
    curves.push({
      xoff: random(TWO_PI),
      yoff: random(TWO_PI),
      phase: random(TWO_PI),
      amp: random(125, 250),
      freq: random(1, 2),
      step: i < 100 ? 0.005 : 0.01,
      col: random(palette)
    });
  }

  redraw();
}

function draw() {
  background(0);
  noFill();

  push();
  scale(s);

  const cx = BASE / 2;
  const cy = BASE / 2;

  for (let c of curves) {
    stroke(c.col);
    strokeWeight(2);

    beginShape();

    for (let t = 0; t < TWO_PI; t += c.step) {
      let x = cx + c.amp * sin(c.freq * t + c.xoff + c.phase);
      let y = cy + c.amp * cos(c.freq * t + c.yoff + c.phase);
      curveVertex(x, y);
    }

    endShape(CLOSE);
  }

  pop();
}

function mousePressed() {
  generate();
}