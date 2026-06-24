const BASE = 1000;

let s;
let points = [];
let numPoints;
let noiseScale;
let noiseStrength;

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  colorMode(RGB, 255, 255, 255, 1);
  regenerate();
  noLoop();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function regenerate() {
  numPoints = floor(random(4, 12));
  noiseScale = random(0.001, 0.02);
  noiseStrength = random(20, 200);
  
  points = [];
  
  for (let i = 0; i < numPoints; i++) {
    let angle = map(i, 0, numPoints, 0, TWO_PI);
    let r = 250;
    
    let x = BASE / 2 + cos(angle) * r;
    let y = BASE / 2 + sin(angle) * r;
    
    points.push(createVector(x, y));
  }
}

function draw() {
  background(0);
  
  push();
  scale(s);

  for (let t = 0; t < 100; t++) {
    beginShape();
    stroke(random(155, 255), random(155, 255), random(155, 255), 0.2);
    noFill();

    for (let i = 0; i < numPoints; i++) {
      let p = points[i];

      let nX = noise(p.x * noiseScale, p.y * noiseScale, t * 0.02);
      let nY = noise(p.x * noiseScale, p.y * noiseScale, t * 0.02 + 1000);

      let x = p.x + map(nX, 0, 1, -noiseStrength, noiseStrength);
      let y = p.y + map(nY, 0, 1, -noiseStrength, noiseStrength);

      if (i === 0) curveVertex(x, y);
      curveVertex(x, y);
      if (i === numPoints - 1) curveVertex(x, y);
    }

    endShape(CLOSE);
  }

  for (let i = 0; i < BASE; i += 10) {
    for (let j = 0; j < BASE; j += 10) {
      let n = noise(i * 0.02, j * 0.02);
      stroke(random(155, 255), random(155, 255), random(155, 255), n * 0.1);
      point(i, j);
    }
  }

  pop();
}

function mousePressed() {
  regenerate();
  redraw();
}