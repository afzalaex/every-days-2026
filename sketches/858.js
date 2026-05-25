const BASE = 1000;
const ART = 500;

let s;
let lineColors = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noFill();
  strokeWeight(2);

  let lines = ART / 6;
  for (let i = 0; i < lines; i++) {
    lineColors.push(color(random(155, 255), random(155, 255), random(155, 255)));
  }
}

function draw() {
  background(0);
  scale(s);

  let offsetX = (BASE - ART) / 2;
  let offsetY = (BASE - ART) / 2;

  stroke(255);
  rect(offsetX, offsetY, ART, ART);

  let t = millis() * 0.001;
  let lineIndex = 0;

  for (let x = offsetX; x < offsetX + ART; x += 6) {
    stroke(lineColors[lineIndex]);
    beginShape();

    for (let y = offsetY; y < offsetY + ART; y += 6) {
      let waveX = sin((x - offsetX) * 0.02 + (y - offsetY) * 0.03 + t) * 35;
      let waveY = cos((y - offsetY) * 0.02 + (x - offsetX) * 0.03 + t) * 35;
      curveVertex(x + waveX, y + waveY);
    }

    endShape();
    lineIndex++;
  }
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}