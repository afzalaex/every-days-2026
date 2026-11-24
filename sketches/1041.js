const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const MIN_COLOR = 155;
const MAX_COLOR = 255;

let viewScale = 1;

function computeScale() {
  viewScale = min(windowWidth, windowHeight, SIZE) / SIZE;
}

function setup() {
  computeScale();
  createCanvas(SIZE * viewScale, SIZE * viewScale);
  noLoop();
  generateArt();
}

function randomColor() {
  return color(
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR),
    random(MIN_COLOR, MAX_COLOR)
  );
}

function generateArt() {
  background(0);

  push();
  scale(viewScale);
  translate(OFFSET + ART / 2, OFFSET + ART / 2);

  strokeCap(ROUND);
  noFill();

  const rings = floor(20);
  const maxR = ART / 2 - 12;
  const points = [];

  for (let r = 0; r < rings; r++) {
    const radius = map(r, 0, rings - 1, maxR * 0.08, maxR);

    const count = floor(random(6, 18)) + r;
    const baseAngle = random(TWO_PI);

    for (let i = 0; i < count; i++) {
      const angle = baseAngle + (i / count) * TWO_PI + random(-0.15, 0.15);

      points.push({
        x: cos(angle) * radius,
        y: sin(angle) * radius,
        r: radius,
        ring: r,
        c: randomColor(),
      });
    }
  }

  strokeWeight(1);

  for (let i = 0; i < points.length; i++) {
    const p = points[i];

    for (let j = i + 1; j < points.length; j++) {
      const q = points[j];

      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const pointGap = sqrt(dx * dx + dy * dy);

      if (
        pointGap < maxR * 0.35 &&
        abs(p.ring - q.ring) <= 1 &&
        random() < 0.55
      ) {
        stroke(lerpColor(p.c, q.c, 0.5));
        line(p.x, p.y, q.x, q.y);
      }
    }
  }

  noStroke();

  for (const p of points) {
    fill(p.c);

    const size = map(p.r, 0, maxR, 6, 3);
    circle(p.x, p.y, size);
  }

  pop();
}

function mousePressed() {
  generateArt();
}

function windowResized() {
  computeScale();
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
  generateArt();
}
