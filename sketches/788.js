const BASE = 1000;

let s = 1;

let segments = [];
let linesCount = 5000;
let baseRadius = 300;
let influence = 150;

function setup() {

  s = min(windowWidth, windowHeight, BASE) / BASE;

  createCanvas(BASE * s, BASE * s);

  angleMode(DEGREES);
  strokeWeight(50);
  noFill();

  generate();
}

function generate(){

  segments = [];

  for (let i = 0; i < linesCount; i++) {

    let angle1 = random(360);
    let angle2 = angle1 + random(500);

    let r1 = baseRadius * noise(i * 2);
    let r2 = baseRadius * noise(i * 2 + 100);

    segments.push({
      a1: angle1,
      a2: angle2,
      r1: r1,
      r2: r2,
      col: [
        random(155,255),
        random(155,255),
        random(155,255)
      ]
    });

  }

}

function draw(){

  background(0);

  scale(s);
  translate(BASE/2, BASE/2);

  let mx = mouseX/s - BASE/2;
  let my = mouseY/s - BASE/2;

  for(let seg of segments){

    let x1 = seg.r1 * cos(seg.a1);
    let y1 = seg.r1 * sin(seg.a1);

    let x2 = seg.r2 * cos(seg.a2);
    let y2 = seg.r2 * sin(seg.a2);

    let d = dist(mx,my,(x1+x2)/2,(y1+y2)/2);

    if(d < influence){

      let force = map(d,0,influence,80,0);
      let ang = atan2((y1+y2)/2-my,(x1+x2)/2-mx);

      x1 += cos(ang)*force;
      y1 += sin(ang)*force;

      x2 += cos(ang)*force;
      y2 += sin(ang)*force;

    }

    stroke(seg.col[0],seg.col[1],seg.col[2]);
    line(x1,y1,x2,y2);

  }

}

function mousePressed(){
  generate();
}