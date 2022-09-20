// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let storedShapes = [(100, 100)]
let xDirection;
let yDirection;

let circleX;
let circleY;
let circleDiam;
let speedLim;
let speedMin;
function notSmallRandom(min, max, small){
  let x = random(min, max)
  if (x<small && x > 0 || x > (small*= -1) && x < 0){
      notSmallRandom(min, max);
  }

  return x
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  xDirection = notSmallRandom(-10, 10, 5);
  yDirection = notSmallRandom(-10, 10, 5);
  circleX = windowWidth/2;
  circleY = windowHeight/2;
  circleDiam = random(50, 100);
  speedLim = 50;
  speedMin = 2;
}


function draw() {
  background(0, 100, 255);
  if (!((circleX < windowWidth - circleDiam/2 ) && (circleX > circleDiam/2))){
    xDirection *= -1;
    xDirection *= notSmallRandom(0, 2, 0.5);
    yDirection *= notSmallRandom(0, 2, 0.5);
    if (!(circleX < windowWidth + (circleDiam/2))){
      circleX = windowWidth - circleDiam/2 - 1
    }
    if (!(circleX > circleDiam/2)){
      circleX = circleDiam/2 + 1;
    }
  }
  if (!((circleY < windowHeight - circleDiam/2) && (circleY > circleDiam/2))){
    yDirection *= -1;
    xDirection *= notSmallRandom(0, 2, 0.5);
    yDirection *= notSmallRandom(0, 2, 0.5);

    if (!(circleY < windowHeight - circleDiam/2)){
      circleY = windowHeight - circleDiam/2 - 1
    }
    if (!(circleY > circleDiam/2)){
      circleY = circleDiam/2 + 1;
    }
  }

  circle(circleX, circleY, circleDiam);
  
  circleX += xDirection;
  circleY += yDirection;
 // increases speed if painfully slow
  if (xDirection<speedMin && xDirection > 0 || xDirection > -speedMin && xDirection < 0){
    xDirection *=  notSmallRandom(2, 10, 1);
  }
  if (yDirection<speedMin && yDirection > 0 || yDirection > -speedMin && yDirection < 0){
    yDirection *=  notSmallRandom(2, 10, 1);
  }
// decreases speed if blisteringly fast
  if (xDirection> speedLim && xDirection > 0 || xDirection < -speedLim && xDirection < 0){
    xDirection /=  notSmallRandom(2, 10, 1);
  }
  if (yDirection > speedLim && yDirection > 0 || yDirection < -speedLim && yDirection < 0){
    yDirection /=  notSmallRandom(2, 10, 1);
  }
  print(xDirection);
  print(yDirection);

}
