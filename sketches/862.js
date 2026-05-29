const BASE = 1000;
const ART  = 500;
const HALF = ART / 2;

let s;
let watchers = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);

  for (let i = 0; i < 2500; i++) {
    watchers.push({
      x:     random(-HALF, HALF),
      y:     random(-HALF, HALF),
      len:   random(4, 18),
      col:   color(random(155, 255), random(155, 255), random(155, 255)),
      phase: random(TWO_PI),
    });
  }
}

function draw() {
  background(0);
  push();
    translate(width / 2, height / 2);
    scale(s);

    const t  = frameCount * 0.008;
    const tx = sin(t * 1.17) * 180 + sin(t * 2.31) * 60;
    const ty = cos(t * 0.91) * 180 + cos(t * 1.73) * 60;

    strokeWeight(2);

    for (let w of watchers) {
      let a = atan2(ty - w.y, tx - w.x);
      a += sin(t * 4 + w.phase) * 0.15;

      const x2 = w.x + cos(a) * w.len;
      const y2 = w.y + sin(a) * w.len;

      stroke(w.col);
      line(w.x, w.y, x2, y2);
    }
  pop();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}