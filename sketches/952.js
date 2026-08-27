const SIZE = 1000;
const ART = 500;
const OFFSET = 250;

const RINGS = 25;
const SEGMENTS = 75;

let seed;
let viewScale;

function setup() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;

  createCanvas(SIZE * viewScale, SIZE * viewScale);

  seed = floor(random(1e9));
  noiseSeed(seed);
}

function draw() {
  background(0);

  const mx = mouseX / viewScale;
  const my = mouseY / viewScale;

  const insideArt =
    mx >= OFFSET && mx <= OFFSET + ART && my >= OFFSET && my <= OFFSET + ART;

  const mouseArtX = insideArt ? mx - SIZE / 2 : 99999;
  const mouseArtY = insideArt ? my - SIZE / 2 : 99999;

  push();
  scale(viewScale);
  translate(SIZE / 2, SIZE / 2);

  noFill();
  strokeCap(SQUARE);

  randomSeed(seed);

  for (let r = 0; r < RINGS; r++) {
    const radius = map(r, 0, RINGS - 1, 5, ART / 2);

    for (let s = 0; s < SEGMENTS; s++) {
      const a1 = map(s, 0, SEGMENTS, 0, TWO_PI);
      const a2 = map(s + 0.72, 0, SEGMENTS, 0, TWO_PI);

      const baseX1 = cos(a1) * radius;
      const baseY1 = sin(a1) * radius;

      let influence = 0;
      let mouseAngle = 0;

      if (insideArt) {
        const d = dist(baseX1, baseY1, mouseArtX, mouseArtY);

        influence = constrain(map(d, 220, 0, 0, 1), 0, 1);

        mouseAngle = atan2(baseY1 - mouseArtY, baseX1 - mouseArtX);
      }

      const n = noise(cos(a1) * 1.5 + 10, sin(a1) * 1.5 + 10, r * 0.11);

      const gate = noise(cos(a1) * 0.7 + 30, sin(a1) * 0.7 + 30, r * 0.18);

      if (gate < 0.47) continue;

      const wobble1 = map(n, 0, 1, -12, 12);

      const wobble2 = map(
        noise(cos(a2) * 1.5 + 10, sin(a2) * 1.5 + 10, r * 0.11),
        0,
        1,
        -12,
        12
      );

      const interaction =
        influence * 70 * sin(mouseAngle * 2 + frameCount * 0.03);

      const r1 = radius + wobble1 + interaction;
      const r2 = radius + wobble2 + interaction;

      const x1 = cos(a1) * r1;
      const y1 = sin(a1) * r1;

      const x2 = cos(a2) * r2;
      const y2 = sin(a2) * r2;

      const thickness = map(noise(r * 0.15, s * 0.08), 0, 1, 1, 6);

      strokeWeight(thickness);

      stroke(random(155, 255), random(155, 255), random(155, 255));

      line(x1, y1, x2, y2);
    }
  }

  noStroke();
  fill(0);
  circle(0, 0, 0);

  pop();
}

function windowResized() {
  viewScale = min(min(windowWidth, windowHeight), SIZE) / SIZE;
  resizeCanvas(SIZE * viewScale, SIZE * viewScale);
}
