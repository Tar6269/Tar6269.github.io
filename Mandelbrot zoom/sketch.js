// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let lastActivationTime = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // background(220);
  if(millis() - lastActivationTime > 2000){
  drawBrot();
  lastActivationTime = millis();
  }

}
function drawBrot(){
  for (let y = 0; y < windowHeight; y++) {
    for (let x = 0; x < windowWidth; x++) {
      mandelBrotter(x, y)
      point(x, y);
      
    }
  }
}
function XYtoComplexCoords(){

}
function mandelBrotter(x, y){
  let mandelBrotEQ = (i*y)^2 + x;
  for (let i = 0; i < iterationLength - 1; i++) {
    mandelBrotEQ = mandelBrotEQ^2 + x;
  }
}
Complex