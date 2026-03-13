const BASE = 1000;

let s = 1;

let cells = 80;
let colors = [];

function setup(){

  s = min(windowWidth, windowHeight, BASE) / BASE;

  createCanvas(BASE * s, BASE * s);

  for(let x = 0; x < cells; x++){
    colors[x] = [];
    for(let y = 0; y < cells; y++){
      colors[x][y] = [
        random(155,255),
        random(155,255),
        random(155,255)
      ];
    }
  }

}

function draw(){

  resetMatrix();
  scale(s);

  background(0);
  translate(BASE/2, BASE/2);

  let step = 500 / cells;

  rectMode(CENTER);
  noStroke();

  let t = frameCount * 0.02;

  for(let gx = -250; gx < 250; gx += step){
    for(let gy = -250; gy < 250; gy += step){

      let px = gx / 250;
      let py = gy / 250;

      let f1 = sin(px * PI * 6 + t);
      let f2 = cos(py * PI * 4 - t * 1.2);
      let f3 = sin((px + py) * PI * 3 + t * 0.7);

      let warpX = (f1 + f2) * 10;
      let warpY = f3 * 6;

      let x = gx + warpX;
      let y = gy + warpY;

      let xi = floor((gx + 250) / step);
      let yi = floor((gy + 250) / step);

      if((xi + yi) % 2 == 0){
        let c = colors[xi][yi];
        fill(c[0], c[1], c[2]);
      } else {
        fill(0);
      }

      rect(x, y, step * 0.9, step * 0.9);

    }
  }

}

















