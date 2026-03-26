const BASE = 1000;
const ART = 500;

let s;

const SYSTEMS = 8;
const LINE_COUNT = 120;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);

  stroke(255);
  noFill();

  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function generate() {
  push();

  scale(s);
  background(0);
  strokeWeight(0.1);

  translate(BASE / 2, BASE / 2);

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(-ART/2, -ART/2, ART, ART);
  drawingContext.clip();

  drawSlices();

  drawingContext.restore();

  pop();
}

function drawSlices() {
  for (let sys = 0; sys < SYSTEMS; sys++) {

    let ox = random(-ART/2, ART/2);
    let oy = random(-ART/2, ART/2);

    let baseAngle = random(TWO_PI);
    let spread = random(0.05, 0.3);

    for (let i = 0; i < LINE_COUNT; i++) {

      let angle = baseAngle + map(i, 0, LINE_COUNT, -spread, spread);

      let dx = cos(angle);
      let dy = sin(angle);

      let len = ART * 2;

      let x1 = ox - dx * len;
      let y1 = oy - dy * len;

      let x2 = ox + dx * len;
      let y2 = oy + dy * len;

      line(x1, y1, x2, y2);
    }
  }
}

function mousePressed() {
  generate();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  generate();
}