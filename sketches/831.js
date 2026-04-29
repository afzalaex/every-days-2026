const BASE = 1000;
const ART = 500;
const HALF = ART / 2;

let s;

const MODULE = 20;

let rects = [];

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  noLoop();
  regenerate();
}

function computeScale() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
  redraw();
}

function regenerate() {
  rects = packRects();
  redraw();
}

function draw() {
  background(0);

  push();
  scale(s);
  translate(BASE / 2, BASE / 2);

  stroke(0);

  for (let i = 0; i < rects.length; i++) {
    let r = rects[i];

    fill(
      random(155, 255),
      random(155, 255),
      random(155, 255)
    );

    rect(r.x, r.y, r.w, r.h);
  }

  pop();
}

function packRects() {
  const bounds = { x: -HALF, y: -HALF, w: ART, h: ART };
  const placed = [];

  for (let tries = 0; tries < 20000; tries++) {
    let gw = floor(random(2, 12)) * MODULE;
    let gh = floor(random(2, 12)) * MODULE;

    let x = bounds.x + floor(random(0, (bounds.w - gw) / MODULE)) * MODULE;
    let y = bounds.y + floor(random(0, (bounds.h - gh) / MODULE)) * MODULE;

    let candidate = { x, y, w: gw, h: gh };

    if (!intersectsAny(candidate, placed)) {
      placed.push(candidate);
    }
  }

  return placed;
}

function intersectsAny(a, list) {
  for (let b of list) {
    if (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    ) return true;
  }
  return false;
}

function mousePressed() {
  regenerate();
}