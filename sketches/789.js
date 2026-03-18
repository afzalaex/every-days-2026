const BASE = 1000;

let s = 1;

let cells = 36;
let cellSize = 500 / cells;

let palette = [];

function setup() {

  s = min(windowWidth, windowHeight, BASE) / BASE;

  createCanvas(BASE * s, BASE * s);
  background(0);

  for (let i = 0; i < 500; i++) {
    palette.push(color(random(155,255), random(155,255), random(155,255)));
  }
}

function draw(){

  background(0);

  scale(s);
  translate(BASE/2, BASE/2);

  drawSystem();
}

function drawSystem(){

  rectMode(CENTER);
  noStroke();

  let mx = (mouseX / width - 0.5) * BASE;
  let my = (mouseY / height - 0.5) * BASE;

  let inside = mx > -250 && mx < 250 && my > -250 && my < 250;

  let control = 0;
  if (inside) {
    control = constrain((mx + 250) / 500, 0, 1);
  }

  for (let x = 0; x < cells; x++) {
    for (let y = 0; y < cells; y++) {

      let nx = x / cells;
      let ny = y / cells;

      let px = -250 + x * cellSize + cellSize/2;
      let py = -250 + y * cellSize + cellSize/2;

      let phase = sin((nx * 6 + ny * 6) + control * PI * 2);

      let rot = phase * PI;

      let w = cellSize * (0.2 + abs(phase) * 0.9);
      let h = cellSize * 0.15;

      let t = (nx * 0.6 + ny * 0.4 + (phase * 0.5 + 0.5)) % 1;

      let scaled = t * (palette.length - 1);

      let i1 = constrain(floor(scaled), 0, palette.length - 1);
      let i2 = constrain(i1 + 1, 0, palette.length - 1);

      let amt = scaled - i1;

      let c1 = palette[i1];
      let c2 = palette[i2];

      if (!c1 || !c2) {
        c1 = color(255);
        c2 = color(255);
      }

      let c = lerpColor(c1, c2, amt);

      push();
      translate(px, py);
      rotate(rot);
      fill(c);
      rect(0, 0, w, h);
      pop();
    }
  }
}