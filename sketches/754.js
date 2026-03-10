const BASE = 1000;
const ART = 500;

let level = 1;
let angle = 0;
let viewScale = 1;

const MAX_LEVEL = 25;

let cubeColors = {};

function setup() {
  createCanvas(BASE, BASE, WEBGL);
  noFill();
  strokeWeight(2);
  computeScale();
  generateColors();
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

  drawCube(level, ART);

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
    generateColors();
  }
}

function generateColors() {
  cubeColors = {};

  for (let xi = 0; xi < level; xi++) {
    for (let yi = 0; yi < level; yi++) {
      for (let zi = 0; zi < level; zi++) {
        const edge =
          xi === 0 ||
          xi === level - 1 ||
          yi === 0 ||
          yi === level - 1 ||
          zi === 0 ||
          zi === level - 1;

        if (!edge) continue;

        const key = `${xi}_${yi}_${zi}`;

        cubeColors[key] = color(
          random(155, 255),
          random(155, 255),
          random(155, 255)
        );
      }
    }
  }
}

function drawCube(level, size) {
  const step = size / level;
  const half = level / 2;

  for (let xi = 0; xi < level; xi++) {
    for (let yi = 0; yi < level; yi++) {
      for (let zi = 0; zi < level; zi++) {
        const edge =
          xi === 0 ||
          xi === level - 1 ||
          yi === 0 ||
          yi === level - 1 ||
          zi === 0 ||
          zi === level - 1;

        if (!edge) continue;

        const key = `${xi}_${yi}_${zi}`;
        stroke(cubeColors[key]);

        const x = (xi - half + 0.5) * step;
        const y = (yi - half + 0.5) * step;
        const z = (zi - half + 0.5) * step;

        push();
        translate(x, y, z);
        box(step * 0.9);
        pop();
      }
    }
  }
}
