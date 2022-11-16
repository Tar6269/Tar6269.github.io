// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let NineMMRound;
let clip = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  class Bullet{
    constructor(x, y, size, speedX, speedY){
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedX = speedX;
      this.speedY = speedY;
    }

    draw(){
      circle(this.x, this.y, this.size);

    }

    move(){
      this.x += this.speedX;

      this.y += this.speedY;
      // print([this.x, this.y])
    }
  }
NineMMRound = new Bullet(width/2, height/2, 50, 1, 1);

}

function draw() {
  background(220);
  for (let i = 0; i < clip.length; i++) {
    const element = clip[i];
    element.draw();
    element.move();
  }
  // NineMMRound.draw()
  // NineMMRound.move()
}

function mousePressed(){

  let newBullet = new Bullet(mouseX, mouseY, 50, 1, 1);
  clip.push(newBullet);
}
