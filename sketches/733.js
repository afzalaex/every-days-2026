let elements = [];
let activeEl = null;
let grabOffset = { x: 0, y: 0 };

function setup() {
  createCanvas(500, 500);
  pixelDensity(1);

  generate();
}

function generate() {

  const ART = 250;
  const HALF = ART / 2;

  const GRID = 25;              
  const CELL = ART / GRID;

  elements = [];

  for (let iy = 0; iy < GRID; iy++) {
    for (let ix = 0; ix < GRID; ix++) {
      const cx = -HALF + ix * CELL + CELL / 2;
      const cy = -HALF + iy * CELL + CELL / 2;

      const u = ix / (GRID - 1);
      const v = iy / (GRID - 1);

      const a =
        sin(u * TWO_PI) * 0.8 +
        cos(v * TWO_PI) * 0.8;

      const angle = a * PI;

      const len = CELL * 0.45;
      const bend = CELL * 0.25;

      const r = random(155, 255);
      const g = random(155, 255);
      const b = random(155, 255);

      elements.push({
        cx, cy,
        angle,
        len,
        bend,
        col: [r, g, b]
      });
    }
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  strokeWeight(2);
  noFill();

  for (let e of elements) {
    push();
    translate(e.cx, e.cy);
    rotate(e.angle);

    stroke(e.col[0], e.col[1], e.col[2]);

    const x0 = -e.len;
    const y0 = 0;

    const x1 = 0;
    const y1 = -e.bend;

    const x2 = e.len;
    const y2 = 0;

    line(x0, y0, x1, y1);
    line(x1, y1, x2, y2);

    pop();
  }
}


function mousePressed() {
  const mx = mouseX - width / 2;
  const my = mouseY - height / 2;

  let best = null;
  let bestD = 10;

  for (let e of elements) {
    const d = dist(mx, my, e.cx, e.cy);
    if (d < bestD) {
      bestD = d;
      best = e;
    }
  }

  if (best) {
    activeEl = best;

    grabOffset.x = best.cx - mx;
    grabOffset.y = best.cy - my;
  }
}

function mouseDragged() {
  if (!activeEl) return;

  const mx = mouseX - width / 2;
  const my = mouseY - height / 2;

  activeEl.cx = mx + grabOffset.x;
  activeEl.cy = my + grabOffset.y;
}

function mouseReleased() {
  activeEl = null;
}










