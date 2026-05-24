const BASE = 1000;
const ART = 500;
let s;
let particles = [];

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noiseDetail(0.00001, 0.00001);

  const offsetX = (BASE - ART) / 2;
  const offsetY = (BASE - ART) / 2;
  const increment = 8;

  for (let y = 0; y < ART; y += increment) {
    for (let x = 0; x < ART; x += increment) {
      particles.push({
        x: x + offsetX,
        y: y + offsetY,
        r: random(155, 255),
        g: random(155, 255),
        b: random(155, 255),
      });
    }
  }

  noLoop();
}

function draw() {
  background(0);
  scale(s);

  const mx = mouseX / s;
  const my = mouseY / s;

  for (let p of particles) {
    const noiseVal = noise(p.x * 0.01, p.y * 0.01);
    const baseAngle = map(noiseVal, 0, 1, 0, TWO_PI);
    const d = dist(p.x, p.y, mx, my);
    const influence = map(constrain(d, 0, 200), 0, 200, 2, 0);
    const angle = baseAngle + influence;
    const radius = noiseVal * 50;

    const posX = p.x + cos(angle) * radius;
    const posY = p.y + sin(angle) * radius;

    stroke(p.r, p.g, p.b);
    noFill();
    ellipse(posX, posY, 5, 1);
  }
}

function mouseMoved() {
  redraw();
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}