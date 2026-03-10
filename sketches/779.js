const BASE = 1000;
let s = 1;

let rects = [];

function setup(){

  s = min(windowWidth, windowHeight, BASE) / BASE;

  createCanvas(BASE*s, BASE*s);

  generate();

  noLoop();
}

function generate(){

  rects = [{x:-250,y:-250,w:500,h:500}];

  let iterations = 80;

  for(let i=0;i<iterations;i++){

    let r = rects[floor(random(rects.length))];

    if(r.w < 40 || r.h < 40) continue;

    let vertical = random() < 0.5;

    if(vertical){

      let split = random(0.3,0.7)*r.w;

      rects.push({x:r.x,y:r.y,w:split,h:r.h});
      rects.push({x:r.x+split,y:r.y,w:r.w-split,h:r.h});

    }else{

      let split = random(0.3,0.7)*r.h;

      rects.push({x:r.x,y:r.y,w:r.w,h:split});
      rects.push({x:r.x,y:r.y+split,w:r.w,h:r.h-split});

    }

    rects.splice(rects.indexOf(r),1);

  }

}

function draw(){

  background(0);
  colorMode(RGB);

  scale(s);

  translate(BASE/2,BASE/2);

  strokeWeight(1.5 / s);
  noFill();

  for(let r of rects){

    stroke(random(155,255),random(155,255),random(155,255));

    rect(r.x,r.y,r.w,r.h);

    let bars = floor(random(3,10));

    if(r.w > r.h){

      for(let i=1;i<bars;i++){

        let x = r.x + r.w*(i/bars);

        line(x,r.y,x,r.y+r.h);

      }

    }else{

      for(let i=1;i<bars;i++){

        let y = r.y + r.h*(i/bars);

        line(r.x,y,r.x+r.w,y);

      }

    }

  }

}

function mousePressed(){

  generate();
  redraw();

}