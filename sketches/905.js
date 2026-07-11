const BASE = 1000;
const ART = 500;

let s;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE);
}

function setup() {
  computeScale();
  createCanvas(s, s);
  angleMode(RADIANS);
  noFill();
  strokeCap(SQUARE);
  noLoop();
}

function windowResized() {
  computeScale();
  resizeCanvas(s, s);
  redraw();
}

function mousePressed() {
  redraw();
}

function draw() {
  background(0);

  let scaleFactor = s / BASE;

  push();
  translate(s / 2, s / 2);
  scale(scaleFactor);

  let rings = 120;
  let points = 300;
  let maxRadius = ART / 2;

  let freqMin = random(2, 8);
  let freqMax = random(40, 80);
  let ampMin = random(5, 15);
  let ampMax = random(15, 35);
  let rotations = random(1, 6);

  for (let j = 0; j < rings; j++) {
    let t = j / rings;

    let radius = lerp(20, maxRadius, t);
    let waveFreq = freqMin + sin(t * PI) * freqMax;
    let amplitude = ampMin + ampMax * pow(1 - t, 2);
    let rot = t * TWO_PI * rotations;

    strokeWeight(1 + 3 * pow(1 - t, 2));
    stroke(random(155, 255), random(155, 255), random(155, 255), 200);

    beginShape();

    for (let i = 0; i <= points; i++) {
      let angle = map(i, 0, points, 0, TWO_PI);
      let offset = sin(angle * waveFreq + rot) * amplitude;
      let r = radius + offset;

      vertex(r * cos(angle), r * sin(angle));
    }

    endShape(CLOSE);
  }

  pop();
}