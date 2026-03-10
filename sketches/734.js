let particles = [];

const CANVAS = 600;
const ART = 300;
const HALF = ART / 2;

const COUNT = 2000;

const CURSOR_RADIUS = 10;

function setup() {
  createCanvas(CANVAS, CANVAS);
  pixelDensity(1);
  noCursor();
  generate();
}

function generate() {
  particles = [];

  for (let i = 0; i < COUNT; i++) {
    let angle = random(TWO_PI);
    let radius = pow(random(), 0.5) * HALF;

    let x = cos(angle) * radius;
    let y = sin(angle) * radius;

    particles.push({
      x,
      y,
      ox: x,
      oy: y,
      vx: random(-0.2, 0.2),
      vy: random(-0.2, 0.2),
      size: random(0.6, 1.8),
      col: color(
        random(155, 255),
        random(155, 255),
        random(155, 255)
      )
    });
  }

  background(0);
}

function draw() {
  translate(width / 2, height / 2);

  noStroke();
  fill(0, 40);
  rectMode(CENTER);
  rect(0, 0, ART + 20, ART + 20);

  let mx = constrain(mouseX - width / 2, -HALF, HALF);
  let my = constrain(mouseY - height / 2, -HALF, HALF);

  for (let p of particles) {
    let dx = mx - p.x;
    let dy = my - p.y;
    let d = sqrt(dx * dx + dy * dy) + 0.0001;

    let force = 0.02;

    p.vx += (dx / d) * force;
    p.vy += (dy / d) * force;

    if (d < CURSOR_RADIUS) {
      let nx = dx / d;
      let ny = dy / d;

      p.x = mx - nx * CURSOR_RADIUS;
      p.y = my - ny * CURSOR_RADIUS;

    let proj = p.vx * nx + p.vy * ny;
      if (proj > 0) {
      p.vx -= nx * proj;
      p.vy -= ny * proj;
  }
    }

    p.vx += (p.ox - p.x) * 0.0005;
    p.vy += (p.oy - p.y) * 0.0005;

    p.vx *= 0.98;
    p.vy *= 0.98;

    p.x += p.vx;
    p.y += p.vy;

    p.x = constrain(p.x, -HALF, HALF);
    p.y = constrain(p.y, -HALF, HALF);

    fill(p.col);
    ellipse(p.x, p.y, p.size, p.size);
  }

  drawBlackCursor(mx, my);
}

function drawBlackCursor(cx, cy) {
  if (cx < -HALF || cx > HALF || cy < -HALF || cy > HALF) return;

  noStroke();
  fill(0);
  ellipse(cx, cy, CURSOR_RADIUS * 2, CURSOR_RADIUS * 2);
}

function mousePressed() {
  generate();
}










