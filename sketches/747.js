const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

const CUBE_SIZE = 30;

let viewScale = 1;
let cubes = [];

function computeCanvas() {
  let s = min(windowWidth, windowHeight, BASE);
  viewScale = s / BASE;
  createCanvas(s, s);
}

function setup() {
  computeCanvas();
  angleMode(DEGREES);
  colorMode(RGB, 255);
  buildCubes();
}

function windowResized() {
  computeCanvas();
}

function buildCubes() {
  cubes = [];

  let spacingX = CUBE_SIZE * 0.866;
  let spacingY = CUBE_SIZE * 0.5;

  let limitX = floor(HALF / spacingX / 2);
  let limitY = floor(HALF / spacingY / 2);

  for (let i = -limitX; i <= limitX; i++) {
    for (let j = -limitY; j <= limitY; j++) {
      let x = (i - j) * spacingX;
      let y = (i + j) * spacingY;

      if (dist(x, y, 0, 0) < HALF) {
        let baseH = int(random(1, 4));

        cubes.push({
          x,
          y,
          baseH,
          h: baseH,
          targetH: baseH,
          top: color(random(155, 255), random(155, 255), random(155, 255)),
          left: color(random(155, 255), random(155, 255), random(155, 255)),
          right: color(random(155, 255), random(155, 255), random(155, 255))
        });
      }
    }
  }
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  for (let c of cubes) {
    c.h = lerp(c.h, c.targetH, 0.1);
    drawCube(c.x, c.y, CUBE_SIZE, c.h, c);
  }

  pop();
}

function drawCube(x, y, s, h, c) {
  push();
  translate(x, y);

  noStroke();
  
  fill(c.top);
  beginShape();
  vertex(0, -h * s);
  vertex(s * 0.866, -h * s + s * 0.5);
  vertex(0, -h * s + s);
  vertex(-s * 0.866, -h * s + s * 0.5);
  endShape(CLOSE);

  fill(c.left);
  beginShape();
  vertex(-s * 0.866, -h * s + s * 0.5);
  vertex(0, -h * s + s);
  vertex(0, s);
  vertex(-s * 0.866, s * 0.5);
  endShape(CLOSE);

  fill(c.right);
  beginShape();
  vertex(0, -h * s + s);
  vertex(s * 0.866, -h * s + s * 0.5);
  vertex(s * 0.866, s * 0.5);
  vertex(0, s);
  endShape(CLOSE);

  pop();
}

function pointInRhombus(px, py, cx, cy, s, h) {
  px -= cx;
  py -= cy - h * s + s * 0.5;

  let dx = s * 0.866;
  let dy = s * 0.5;

  return abs(px / dx) + abs(py / dy) <= 1;
}

function mousePressed() {
  let mx = mouseX / viewScale - BASE / 2;
  let my = mouseY / viewScale - BASE / 2;

  for (let i = cubes.length - 1; i >= 0; i--) {
    let c = cubes[i];
    if (pointInRhombus(mx, my, c.x, c.y, CUBE_SIZE, c.h)) {
      c.targetH =
        c.targetH > c.baseH
          ? c.baseH
          : c.baseH + int(random(2, 5));
      break;
    }
  }
}













