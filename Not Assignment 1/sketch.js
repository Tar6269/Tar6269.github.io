// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//initialize variables
let WinSize;
let black, blackStart;
let whitePieces, blackPieces;
let pawn, knight, bishop, rook, queen, king;
let pieceOne
let whitePawnOne, whitePawnTwo, whitePawnThree, whitePawnFour, whitePawnFive, whitePawnSix, whitePawnSeven, whitePawnEight;
let blackPawnOne, blackPawnTwo, blackPawnThree, blackPawnFour, blackPawnFive, blackPawnSix, blackPawnSeven, blackPawnEight;
let turn;
let selectedPiece;
let selectedTile;

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
function XYToTile(tileWidth, tileHeight){
  let tileX = floor(map(tileWidth, 0, width, 0, 8))+ 1;
  let tileY = floor(map(tileHeight, 0, height, 0, 8)) + 1;

  return [tileX, tileY];
}
function setup() {
  class Pawn{
    constructor(location, team, colour) {
      this.team = team;
      this.location = location;
      this.colour = colour
      this.hasMoved = false
    }
    move(){

      if (turn === "white"){
        if (this.hasMoved === false && XYToTile(mouseX, mouseY)[1] === XYToTile(selectedPiece.location[0], selectedPiece.location[1])[1] + 2 && XYToTile(mouseX, mouseY)[0] === XYToTile(selectedPiece.location[0], selectedPiece.location[1])[0]){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          }
        else if (XYToTile(mouseX, mouseY)[1] === XYToTile(selectedPiece.location[0], selectedPiece.location[1])[1] + 1 && XYToTile(mouseX, mouseY)[0] === XYToTile(selectedPiece.location[0], selectedPiece.location[1])[0]){
        this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
        
        }
        turn = "black";
      }

      else{
        if (this.hasMoved === false && XYToTile(mouseX, mouseY)[1] === XYToTile(selectedPiece.location[0], selectedPiece.location[1])[1] -2 && XYToTile(mouseX, mouseY)[0] === XYToTile(selectedPiece.location[0], selectedPiece.location[1])[0]){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          }
        else if (XYToTile(mouseX, mouseY)[1] === XYToTile(selectedPiece.location[0], selectedPiece.location[1])[1] - 1 && XYToTile(mouseX, mouseY)[0] === XYToTile(selectedPiece.location[0], selectedPiece.location[1])[0]){
        this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
        turn = "white";
      }
    }
      print(this.location);
      this.hasMoved = true;
      
    }
    draw(){
      fill(this.colour);
      if (this.team === "white"){
        stroke(0)
      }
      else{
        stroke(255)
      }
      strokeWeight(1.2)
      circle(this.location[0], this.location[1], WinSize/8.5);
    }
  }
  WinSize = Math.min(windowWidth, windowHeight)
  createCanvas(WinSize, WinSize);
  black = false;
  blackStart = false;
  turn = "white"
  pieceSelected = false
  whitePieces = [whitePawnOne, whitePawnTwo, whitePawnThree, whitePawnFour, whitePawnFive, whitePawnSix, whitePawnSeven, whitePawnEight];
  blackPieces = [blackPawnOne, blackPawnTwo, blackPawnThree, blackPawnFour, blackPawnFive, blackPawnSix, blackPawnSeven, blackPawnEight];

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
       square(WinSize/8*x, WinSize/8*y, WinSize/8);
    }
  }
}

function drawPieces(){
  for (let piece = 0; piece < whitePieces.length; piece++) {
    const element = whitePieces[piece];
    whitePieces[piece].draw()
  }

  for (let piece = 0; piece < blackPieces.length; piece++) {
    const element = blackPieces[piece];
    blackPieces[piece].draw()
    
  }
}

function draw() {

  drawBoard();
  drawPieces();

}

function scanForSelectedPiece(team){
  for (let piece = 0; piece < team.length; piece++) {
    const element = team[piece];
    // print(XYToTile(whitePieces[piece].location[0], whitePieces[piece].location[1]));
    if ((XYToTile(team[piece].location[0], team[piece].location[1]))[0] === selectedTile[0] && (XYToTile(team[piece].location[0], team[piece].location[1]))[1] === selectedTile[1]){
      selectedPiece = team[piece];
      selectedPiece.colour = 100;
      pieceSelected = true;
      print("piece selected!");
      }
    }
  }
  function scanForBlackPiece(){
    for (let piece = 0; piece < blackPieces.length; piece++) {
      const element = blackPieces[piece];
      // print(XYToTile(whitePieces[piece].location[0], whitePieces[piece].location[1]));
      if ((XYToTile(blackPieces[piece].location[0], blackPieces[piece].location[1]))[0] === selectedTile[0] && (XYToTile(blackPieces[piece].location[0], blackPieces[piece].location[1]))[1] === selectedTile[1]){
        selectedPiece = blackPieces[piece];
        selectedPiece.colour = 100;
        pieceSelected = true;
        print("piece selected!");
        }
      }
    }
function mouseClicked(){
  if (pieceSelected === false){
  selectedTile = getMouseTile();
  
    if (turn === "white"){
      scanForSelectedPiece(whitePieces);
      }

    else if (turn === "black"){
      scanForSelectedPiece(blackPieces);
    }
  }
  else{
 
    selectedPiece.move();
    
    pieceSelected = false;
    if (selectedPiece.team === "white"){
      selectedPiece.colour = 255;
    }
    else {
      selectedPiece.colour = 0;
    }
  }
  print(selectedTile);
}
