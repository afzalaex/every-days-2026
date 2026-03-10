const BASE = 1000;
let s = 1;

let seeds = [];
let cells = [];

function setup(){

  s = min(windowWidth, windowHeight, BASE) / BASE;

  createCanvas(BASE*s, BASE*s);

  generate();
  noLoop();
}

function generate(){

  seeds = [];
  cells = [];

  let count = 160;

  for(let i=0;i<count;i++){
    seeds.push({
      x:random(-250,250),
      y:random(-250,250)
    });
  }

  let res = 100;

  for(let y=0;y<res;y++){
    for(let x=0;x<res;x++){

      let px = map(x,0,res,-250,250);
      let py = map(y,0,res,-250,250);

      let closest = 0;
      let dmin = 999999;

      for(let i=0;i<seeds.length;i++){
        let dx = px-seeds[i].x;
        let dy = py-seeds[i].y;
        let d = dx*dx+dy*dy;

        if(d < dmin){
          dmin = d;
          closest = i;
        }
      }

      cells.push({
        x:px,
        y:py,
        id:closest
      });
    }
  }
}

function draw(){

  background(0);

  translate(width/2, height/2);

  scale(s);

  strokeWeight(2/s);

  let angles = [];

  for(let i=0;i<seeds.length;i++){
    angles[i] = random(TWO_PI);
  }

  for(let c of cells){

    let a = angles[c.id];

    stroke(
      random(155,255),
      random(155,255),
      random(155,255)
    );

    let len = 4;

    line(
      c.x,
      c.y,
      c.x + cos(a)*len,
      c.y + sin(a)*len
    );
  }
}

function mousePressed(){
  generate();
  redraw();
}