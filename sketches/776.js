const BASE = 1000;
let s = 1;

function setup() {

  s = min(windowWidth, windowHeight, BASE) / BASE;

  createCanvas(BASE * s, BASE * s);
  pixelDensity(1);

  noLoop();
}

function draw() {

  background(0);
  colorMode(RGB);

  scale(s);

  translate(BASE / 2, BASE / 2);

  const ART = 500;
  const HALF = ART / 2;

  strokeWeight(2 / s);
  noFill();

  const seeds = [];
  const seedCount = 32;

  for (let i = 0; i < seedCount; i++) {
    seeds.push({
      x: random(-HALF, HALF),
      y: random(-HALF, HALF),
      c: color(
        random(155,255),
        random(155,255),
        random(155,255)
      )
    });
  }

  const rays = 10000;

  for (let i = 0; i < rays; i++) {

    const x = random(-HALF, HALF);
    const y = random(-HALF, HALF);

    let nearest = null;
    let dMin = Infinity;

    for (let s of seeds) {
      const d = dist(x, y, s.x, s.y);
      if (d < dMin) {
        dMin = d;
        nearest = s;
      }
    }

    const angle = atan2(y - nearest.y, x - nearest.x);
    const len = map(dMin, 0, ART/2, 2, 18);

    stroke(
      red(nearest.c),
      green(nearest.c),
      blue(nearest.c)
    );

    push();
    translate(x, y);
    rotate(angle + random(-0.15, 0.15));
    line(0, 0, len, 0);
    pop();
  }

  strokeWeight(1 / s);

  for (let i = 0; i < 3000; i++) {
    stroke(
      random(155,255),
      random(155,255),
      random(155,255)
    );

    point(
      random(-HALF, HALF),
      random(-HALF, HALF)
    );
  }
}

function mousePressed() {

  const mx = mouseX / s - BASE/2;
  const my = mouseY / s - BASE/2;

  const HALF = 250;

  if (mx >= -HALF && mx <= HALF && my >= -HALF && my <= HALF) {
    redraw();
  }

}