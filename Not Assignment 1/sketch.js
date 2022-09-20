// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let size;
let black, blackStart;
let whitePieces, blackPieces;
let pawn, knight, bishop, rook, queen, king;

function setup() {
  size = Math.min(windowWidth, windowHeight)
  createCanvas(size, size);
  black = false;
  blackStart = false;
  
}
function getMouseTile(){
  let tileX = round(map(mouseX, 0, width, 0, 8));
  let tileY = round(map(mouseY, 0, height, 0, 8));

  return (tileX, tileY);
}
class Pawn{
  constructor(team, location) {
    this.team = team;
    this.location = location;
    this.shape = circle(location, size/8);
  }
  move(){
    this.location = getMouseTile();
    
  }
}

function windowResized(){
  setup();
}
function drawBoard(){

  fill(0)
  for (let x = 0; x <8; x++){
    if (blackStart === true){
      black = true;
      blackStart = false;
    }
    else if (blackStart ===false){
      black = false;
      blackStart = true;
    }
    for (let y=0; y <8; y++){
      if (black === true){
        fill(0);
        black = false;
      }
      else if (black ===false){
        fill(255);
        black = true
      }
       square(size/8*x, size/8*y, size/8);
    }
  }
}

function drawPieces(){

}

function draw() {

  drawBoard();
  
  

}