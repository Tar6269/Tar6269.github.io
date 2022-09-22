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
let pieceOne
let whitePawnOne, whitePawnTwo, whitePawnThree, whitePawnFour, whitePawnFive, whitePawnSix, whitePawnSeven, whitePawnEight;
let blackPawnOne, blackPawnTwo, blackPawnThree, blackPawnFour, blackPawnFive, blackPawnSix, blackPawnSeven, blackPawnEight;
let turn;
let selectedPiece;
function getMouseTile(){
  let tileX = floor(map(mouseX, 0, width, 0, 8))+ 1;
  let tileY = floor(map(mouseY, 0, height, 0, 8)) + 1;

  
  return [tileX, tileY];
}
function tileToXY(tileWidth, tileHeight){
  let tileX = map(tileWidth -0.5, 0, 8, 0, width);
  let tileY = map(tileHeight -0.5, 0, 8, 0, height);

  return [tileX, tileY];
}
function setup() {
  class Pawn{
    constructor(location, team, colour) {
      this.team = team;
      this.location = location;
      this.colour = colour
    }
    move(){
      this.location = getMouseTile();
    }
    draw(){
      fill(this.colour);

      circle(this.location[0], this.location[1], size/8.5);
    }
  }
  size = Math.min(windowWidth, windowHeight)
  createCanvas(size, size);
  black = false;
  blackStart = false;
  turn = "white"
  pieceSelected = false
  whitePieces = [whitePawnOne, whitePawnTwo, whitePawnThree, whitePawnFour, whitePawnFive, whitePawnSix, whitePawnSeven, whitePawnEight];
  blackPieces = [blackPawnOne, blackPawnTwo, blackPawnThree, blackPawnFour, blackPawnFive, blackPawnSix, blackPawnSeven, blackPawnEight];
  print(tileToXY(1,1))

  for (let pawn = 0; pawn < whitePieces.length; pawn++) {
    const element = whitePieces[pawn];
    whitePieces[pawn] = new Pawn(tileToXY(pawn+1, 2),"white", 255);
  }
  for (let pawn = 0; pawn < blackPieces.length; pawn++) {
    const element = blackPieces[pawn];
    blackPieces[pawn] = new Pawn(tileToXY(pawn+1, 7), "black", 0);
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

  fill(30)
  stroke(255)
  strokeWeight(1.5)
  for (let piece = 0; piece < whitePieces.length; piece++) {
    const element = whitePieces[piece];
    whitePieces[piece].draw()
  }
  fill(255)
  stroke(0)
  for (let piece = 0; piece < blackPieces.length; piece++) {
    const element = blackPieces[piece];
    blackPieces[piece].draw()
    
  }

}
function mouseClicked(){
  if (pieceSelected === false){
  let selectedTile = getMouseTile()
  print(selectedTile);
  if (turn === "white"){
    for (let piece = 0; piece < whitePieces.length; piece++) {
      const element = whitePieces[piece];
      if (whitePieces[piece].location === tileToXY(selectedTile) && whitePieces.team === "white"){
        selectedPiece = whitePieces[piece];
        pieceSelected = true;
        }
      }
    }
  }
  else{
    pieceSelected.move()
  }
}