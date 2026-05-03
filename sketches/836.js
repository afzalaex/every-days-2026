const BASE = 1000;
let s;

let phaseShift = 0;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  angleMode(DEGREES);
  noLoop();
  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  generate();
}

function generate() {
  background(0);

  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  noFill();
  strokeWeight(10);

  let layers = 150;
  let shapes = 200;
  let maxRadius = 250;
  
  for (let i = 0; i < layers; i++) {
    let radius = map(i, 0, layers, 10, maxRadius);
    let angleOffset = map(i, 0, layers, 0, 720);
    let distortion = map(i, 0, layers, 10, 60);
    
    beginShape();
    for (let j = 0; j <= shapes; j++) {
      let angle = j * (360 / shapes);
      let wave = sin(angle * 4 + angleOffset + phaseShift) * distortion;
      let r = radius + wave;

      let x = r * cos(angle);
      let y = r * sin(angle);

      stroke(random(155, 255), random(155, 255), random(155, 255));
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  pop();
}

function mouseWheel(event) {
  phaseShift += event.delta * 0.1;
  generate();
  return false;
}