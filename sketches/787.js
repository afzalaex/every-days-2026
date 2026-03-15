const BASE = 1000;

let s = 1;

let rects = [];
let splits = 900;

function setup() {

  s = min(windowWidth, windowHeight, BASE) / BASE;

  createCanvas(BASE * s, BASE * s);

  generate();
}

function generate(){

  rects = [];

  rects.push({x:-250, y:-250, w:500, h:500});

  for (let i = 0; i < splits; i++) {

    let index = floor(random(rects.length));
    let r = rects.splice(index,1)[0];

    if (random() < 0.5 && r.w > 10) {

      let cut = random(0.3,0.7) * r.w;

      rects.push({x:r.x, y:r.y, w:cut, h:r.h});
      rects.push({x:r.x + cut, y:r.y, w:r.w - cut, h:r.h});

    } else if (r.h > 10) {

      let cut = random(0.3,0.7) * r.h;

      rects.push({x:r.x, y:r.y, w:r.w, h:cut});
      rects.push({x:r.x, y:r.y + cut, w:r.w, h:r.h - cut});

    } else {

      rects.push(r);
    }
  }

  drawArtwork();
}

function drawArtwork(){

  background(0);

  push();

  scale(s);
  translate(500,500);

  for (let r of rects) {

    fill(random(155,255), random(155,255), random(155,255));
    stroke(0);

    rect(r.x, r.y, r.w, r.h);
  }

  pop();
}

function mousePressed(){
  generate();
}