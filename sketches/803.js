const BASE = 1000;
let s = 1;

let lines = [];
let count = 200;

function setup() {
  computeScale();
  createCanvas(BASE * s, BASE * s);
  strokeWeight(2);
  noFill();

  generate();
}

function computeScale() {
  s = min(windowWidth, windowHeight) / BASE;
  s = min(s, 1);
}

function windowResized() {
  computeScale();
  resizeCanvas(BASE * s, BASE * s);
}

function generate() {
  lines = [];

  for (let i = 0; i < count; i++) {
    let x1 = random(-200, 200);
    let y1 = random(-200, 200);

    let x2 = x1 + random(-80, 80);
    let y2 = y1 + random(-80, 80);

    lines.push({
      x1, y1, x2, y2,
      color: [
        random(155, 255),
        random(155, 255),
        random(155, 255)
      ]
    });
  }
}

function draw() {
  background(0);

  scale(s);
  translate(BASE / 2, BASE / 2);

  for (let l of lines) {
    stroke(l.color[0], l.color[1], l.color[2]);

    line(l.x1, l.y1, l.x2, l.y2);
    
    line(-l.x1, l.y1, -l.x2, l.y2);

    line(l.x1, -l.y1, l.x2, -l.y2);

    line(-l.x1, -l.y1, -l.x2, -l.y2);
  }
}
function mousePressed() {
  generate();
}