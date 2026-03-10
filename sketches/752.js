const BASE = 1000;

let viewScale = 1;
let tilt = 0;

function setup() {
  computeCanvas();
  pixelDensity(1);
  noFill();
  strokeWeight(5);
  noLoop();
  redraw();
}

function computeCanvas() {
  viewScale = min(windowWidth, windowHeight, BASE) / BASE;
  viewScale = min(viewScale, 1);
  createCanvas(BASE * viewScale, BASE * viewScale);
}

function windowResized() {
  computeCanvas();
  redraw();
}

function draw() {
  background(0);

  push();
  scale(viewScale);
  translate(BASE / 2, BASE / 2);

  applyMatrix(
    1,        
    tilt,     
    tilt,     
    1,        
    0,        
    0         
  );

  const grid = 10;
  const step = 22;
  const rangeLimit = 300;

  for (let x = -grid; x <= grid; x++) {
    for (let y = -grid; y <= grid; y++) {

      const gx = x * step;
      const gy = y * step;

      if (abs(gx) < rangeLimit && abs(gy) < rangeLimit) {

        const warpX = gx * (1 + (y / grid) * 0.25);
        const warpY = gy * (1 + (x / grid) * 0.25);

        stroke(
          random(155, 255),
          random(155, 255),
          random(155, 255)
        );

        if (x < grid) {
          const nx = (x + 1) * step * (1 + (y / grid) * 0.25);
          if (abs(nx) < rangeLimit) {
            line(warpX, warpY, nx, warpY);
          }
        }

        if (y < grid) {
          const ny = (y + 1) * step * (1 + (x / grid) * 0.25);
          if (abs(ny) < rangeLimit) {
            line(warpX, warpY, warpX, ny);
          }
        }
      }
    }
  }

  pop();
}

function mouseWheel(event) {
  tilt += event.delta * 0.0002;
  tilt = constrain(tilt, -0.35, 0.35);
  redraw();
  return false;
}

