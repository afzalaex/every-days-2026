const BASE = 1000;
const ART = 500;
const MAX_LEVEL = 25;
let level = 1;
let angle = 0;
let viewScale = 1;
let points = [];
let pointColors = [];

function setup() {
  createCanvas(BASE, BASE, WEBGL);
  strokeWeight(2);
  noFill();
  computeScale();
  generateSphere(level);
}

function computeScale() {
  const s = min(windowWidth, windowHeight, BASE);
  resizeCanvas(s, s);
  viewScale = s / BASE;
}

function windowResized() {
  computeScale();
}

function draw() {
  background(0);
  ortho(-BASE / 2, BASE / 2, -BASE / 2, BASE / 2, -2000, 2000);
  scale(viewScale);
  rotateX(angle * 0.6);
  rotateY(angle);

  for (let k = 0; k < points.length; k++) {
    const [x, y, z] = points[k];
    const [r, g, b] = pointColors[k];
    stroke(r, g, b);
    push();
    translate(x, y, z);
    box(12);
    pop();
  }

  angle += 0.003;
}

function mousePressed() {
  const cx = width / 2;
  const cy = height / 2;
  const halfArt = (ART * viewScale) / 2;
  if (
    mouseX > cx - halfArt &&
    mouseX < cx + halfArt &&
    mouseY > cy - halfArt &&
    mouseY < cy + halfArt
  ) {
    level++;
    if (level > MAX_LEVEL) level = 1;
    generateSphere(level);
  }
}

function generateSphere(lvl) {
  points = [];
  pointColors = [];
  const rings = 10 + lvl * 2;
  const r = ART * 0.6;
  for (let i = 0; i <= rings; i++) {
    const phi = (i / rings) * Math.PI;
    const segs = Math.max(1, Math.round(Math.sin(phi) * rings * 1.6));
    for (let j = 0; j < segs; j++) {
      const theta = (j / segs) * Math.PI * 2;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      points.push([x, y, z]);
      pointColors.push([
        random(155, 255),
        random(155, 255),
        random(155, 255)
      ]);
    }
  }
}