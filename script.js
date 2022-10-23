let canvas = document.getElementById("mainCanvas");
let ctx = canvas.getContext("2d");

let squares = [];

class square {
  constructor(x, y, width, height) {
    this.x =x;
    this.y =y;
    this.width =width;
    this.height =height;
  }
}

let width = 100;
let height = 50;

for(let i = 0;i<width;i++) {
  squares.push([]);
  for(let j = 0;j<height;j++) {
    squares[i].push(new square(i*10, j*10, 10, 10));
    let c = squares[i][j];
    if((j+i)%2==0) {
      ctx.fillStyle="lightgray";
    } else {
      ctx.fillStyle="white";
    }
    ctx.fillRect(c.x, c.y, c.width, c.height);
  }
}

let mouseX = 0;
let mouseY = 0;
let pmouseX = 0;
let pmouseY = 0;
document.addEventListener("mousemove", () => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

let lineStart=false;
let sx = 0;
let sy = 0;

document.addEventListener("mousedown", () => {
  lineStart=true;
  sx=mouseX;
  sy=mouseY;
});

function mouseOver() {
  if((Math.floor(pmouseX/10)+Math.floor(pmouseY/10))%2==0) {
    ctx.fillStyle="lightgray";
  } else {
    ctx.fillStyle="white";
  }
  ctx.fillRect(Math.floor(pmouseX/10-1)*10, Math.floor(pmouseY/10-1)*10, 10, 10);
  ctx.fillStyle="gray";
  ctx.fillRect(Math.floor(mouseX/10-1)*10, Math.floor(mouseY/10-1)*10, 10, 10);
}
let slope;
let slope2;
function update() {
  if(Math.floor(mouseX/10-1)<width&&Math.floor(mouseY/10-1)<height) {
    mouseOver();
  }

  ctx.fillStyle="black";
  ctx.fillRect(0, height*10, width*10, 100);
  ctx.fillRect(width*10, 0, 100, height*10+100);

  if(lineStart==true) {
    ctx.fillStyle="black";
    if(mouseX-sx!=0) {
      slope = (mouseY-sy)/(mouseX-sx);
    } else {
      slope = sy;
    }
    ctx.fillStyle="white"
    slope2=(pmouseY-sy)/(pmouseX-sx);
    for(let i = -width;i<width;i++) {
      ctx.fillRect((i*10)+Math.floor((sx/10)-1)*10, (Math.floor(i*slope2)*10)+(height*10)-(Math.floor((sy/10)+5)*10), 10, 10);
    }
    ctx.fillStyle="black";
    for(let i = -width;i<width;i++) {
      ctx.fillRect((i*10)+Math.floor((sx/10)-1)*10, (Math.floor(i*slope)*10)+(height*10)-(Math.floor((sy/10)+5)*10), 10, 10);
    }
    ctx.fillStyle="red";
    ctx.fillRect(Math.floor((sx/10)-1)*10, Math.floor((sy/10)-1)*10, 10, 10);
  }
  
  pmouseX=mouseX;
  pmouseY=mouseY;
  setTimeout(update, 10);
}

update();
