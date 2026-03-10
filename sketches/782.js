const BASE = 1000;
let s = 1;

function setup() {

  s = min(windowWidth, windowHeight, BASE) / BASE;

  createCanvas(BASE * s, BASE * s);

  generate();
  noLoop();
}

function generate(){

  resetMatrix();
  background(0);

  translate(width/2, height/2);

  let grid = 50;
  let step = 500 / grid;

  strokeWeight(1.5 * s);
  noFill();

  for (let gy = -grid/2; gy < grid/2; gy++) {
    for (let gx = -grid/2; gx < grid/2; gx++) {

      let x = (gx * step + step/2) * s;
      let y = (gy * step + step/2) * s;

      stroke(random(155,255), random(155,255), random(155,255));

      let dir = floor(random(4));

      beginShape();

      if (dir === 0) {
        vertex(x - step/2 * s, y);
        vertex(x + step/2 * s, y);
      }

      if (dir === 1) {
        vertex(x, y - step/2 * s);
        vertex(x, y + step/2 * s);
      }

      if (dir === 2) {
        vertex(x - step/2 * s, y);
        vertex(x, y + step/2 * s);
      }

      if (dir === 3) {
        vertex(x + step/2 * s, y);
        vertex(x, y + step/2 * s);
      }

      endShape();

    }
  }

}

function mousePressed(){
  generate();
}
