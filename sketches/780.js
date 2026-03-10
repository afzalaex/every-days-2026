const BASE = 1000;
let s = 1;

let lines = [];

function setup(){

  s = min(windowWidth, windowHeight, BASE) / BASE;
  createCanvas(BASE*s, BASE*s);

  generate();
  noLoop();
}

function generate(){

  lines = [];

  let grid = 50;
  let step = 500/grid;

  for(let y=0;y<=grid;y++){
    for(let x=0;x<=grid;x++){

      let px = -250 + x*step;
      let py = -250 + y*step;

      let angle = floor(random(4)) * HALF_PI;
      let len = step * random(1.5,3.5);

      let x2 = px + cos(angle)*len;
      let y2 = py + sin(angle)*len;

      lines.push({
        x1:px,
        y1:py,
        x2:x2,
        y2:y2,
        r:random(155,255),
        g:random(155,255),
        b:random(155,255)
      });
    }
  }

}

function draw(){

  background(0);

  translate(width/2,height/2);
  scale(s);

  strokeWeight(1/s);

  for(let l of lines){

    stroke(l.r,l.g,l.b);
    line(l.x1,l.y1,l.x2,l.y2);

  }

}

function mousePressed(){

  generate();
  redraw();

}