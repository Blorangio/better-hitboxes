let canvas = document.getElementById("mainCanvas");
let ctx = canvas.getContext("2d");

let textColliding = document.getElementById('isColliding');

let squares = [];

class square {
  constructor(x, y, width, height) {
    this.x =x;
    this.y =y;
    this.width =width;
    this.height =height;
  }
}

class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let width = 100;
let height = 50;

let mouseX = 0;
let mouseY = 0;
let pmouseX = 0;
let pmouseY = 0;
document.addEventListener("mousemove", () => {
    mouseX = event.clientX-10;
    mouseY = event.clientY-10;
});

let lineStart=false;
let sx = 0;
let sy = 0;

let lines = [];
let greaterOrLessThan = [];
let clicked = false;

document.addEventListener("mousedown", () => {
  if(greaterOrLessThan.length==lines.length) {
    lineStart=true;
    sx=mouseX;
    sy=mouseY;
  } else {
    clicked=true;
  }
});

let lineEnd=false;
document.addEventListener("mouseup", () => {
  lineEnd=true;
});

function checkLineCollision(mousePos, b, slope, check) {
  if(check) {
    if(mousePos.y>=slope*mousePos.x+b) {
      return true;
    }
  } else {
    if(mousePos.y<=slope*mousePos.x+b) {
      return true;
    }
  }
	return false;
}
let slope;
let b;
let once=true;
function update() {

  ctx.fillStyle="black";
  ctx.fillRect(0, 0, width*10+100, height*10+100);
  ctx.fillStyle="white";
  ctx.fillRect(0, 0, width*10, height*10);

  if(lineStart) {
    if(sx-mouseX!=0) {
      slope = (sy-mouseY)/(sx-mouseX);
    } else {
      slope = sx;
    }
    b = mouseY-mouseX*slope
    ctx.beginPath();
    ctx.moveTo(0, b);
    ctx.lineTo(width*10, (width*10)*slope+b);
    ctx.stroke();
  }

  if(lineEnd) {
    if(once) {
      lines.push([b, slope]);
      once=false;
    }
    lineStart=false;
  }
  
  if(lineEnd&&greaterOrLessThan.length==lines.length) {
    lineEnd=false;
    once=true;
  } else if(lineEnd) {
    if(clicked==true) {
      greaterOrLessThan.push(checkLineCollision(new Coord(mouseX, mouseY), b, slope, true));
      clicked=false;
    }
  }
  let truths = 0;
  for(let i = 0;i<lines.length;i++) {
    let bs = lines[i][0];
    let slopes = lines[i][1];
    
    ctx.beginPath();
    ctx.moveTo(0, bs);
    ctx.lineTo(width*10, (width*10)*slopes+bs);
    ctx.stroke();
    if(greaterOrLessThan.length==lines.length) {
      if(checkLineCollision(new Coord(mouseX, mouseY), bs, slopes, greaterOrLessThan[i])) {
        truths+=1;
      }
    }
  }

  if(truths==lines.length) {
    textColliding.innerHTML = "Collision Status: true";
  } else {
    textColliding.innerHTML = "Collision Status: false";
  }
  
  pmouseX=mouseX;
  pmouseY=mouseY;
  setTimeout(update, 10);
}

update();
