const BASE = 1000;
let s = 1;

let n = 150;
let k;

function setup() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
  createCanvas(BASE * s, BASE * s);

  strokeWeight(1.5);
  noFill();
  noLoop();

  generate();
}

function generate() {
  background(0);

  k = floor(random(2, n - 1));

  push();
  translate(width / 2, height / 2);
  scale(s);

  let r = 250;

  let pts = [];
  for (let i = 0; i < n; i++) {
    let a = TWO_PI * i / n;
    pts.push({
      x: cos(a) * r,
      y: sin(a) * r
    });
  }

  for (let i = 0; i < n; i++) {
    let j = (i * k) % n;

    stroke(
      155 + (i * 3) % 100,
      155 + (i * 5) % 100,
      155 + (i * 7) % 100
    );

    line(pts[i].x, pts[i].y, pts[j].x, pts[j].y);
  }

  pop();
}

function mousePressed() {
  generate();
}

function windowResized() {
  s = min(windowWidth, windowHeight, BASE) / BASE;
  resizeCanvas(BASE * s, BASE * s);
  generate();
}