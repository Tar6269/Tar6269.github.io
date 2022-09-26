// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let squareX, squareY;
let SquareSpeedX, squareSpeedY;
let squareSize;
let squareSpeed;
function setup() {
  createCanvas(windowWidth, windowHeight);

  squareSize = 50 ;

  squareX = 0;
  squareY = 0;
  squareSpeed = 5;

  SquareSpeedX = 5;
  squareSpeedY = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  if (squareX >= windowWidth - squareSize && squareY >= windowHeight - squareSize){
    squareSpeedY = 0;
    SquareSpeedX = -squareSpeed;
    squareX = windowWidth - squareSize;
    squareY = windowHeight - squareSize;
  }

  else if (squareX > windowWidth - squareSize && squareY <= 0){
    squareSpeedY = squareSpeed;
    SquareSpeedX = 0;

    squareX = windowWidth - squareSize;
    squareY = 0;
  }


  else if (squareX <= 0 && squareY >= windowHeight - squareSize){
    SquareSpeedX = 0;
    squareSpeedY = -squareSpeed;
    windowWidth - squareSize

    squareX = 0;
    squareY = windowHeight - squareSize;
  }
  else if (squareX <= 0 && squareY <= 0){
    squareSpeedY = 0;
    SquareSpeedX = squareSpeed;
    squareX = 0;
    squareY = 0;
  }
  square(squareX, squareY, squareSize);

  squareX += SquareSpeedX;
  squareY += squareSpeedY;

}
