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
      
      this.colour = colour;
      this.hasMoved = false;
    }

    currentTile(){
      return XYToTile(this.location[0], this.location[1]);
    }  

    move(){

      if (turn === "white"){
        // print(this.currentTile());
        // print(trueIfPiece(blackPieces, [this.currentTile()[0]+ 1 , this.currentTile()[1] + 1]));
        // print(getMouseTile());
        // print([this.currentTile()[0]+ 1 , this.currentTile()[1] + 1])
        // print(getMouseTile()[0] === this.currentTile()[0]+ 1 && getMouseTile()[1] === this.currentTile()[1] + 1)
        if (trueIfPiece(blackPieces, [this.currentTile()[0]+ 1 , this.currentTile()[1] + 1]) && getMouseTile()[0] === this.currentTile()[0]+ 1 && getMouseTile()[1] === this.currentTile()[1] + 1 || trueIfPiece(blackPieces, [this.currentTile()[0]- 1 , this.currentTile()[1] + 1]) && getMouseTile()[0] === this.currentTile()[0] - 1 && getMouseTile()[1] === this.currentTile()[1] + 1){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          scanForPiece(blackPieces, this.currentTile());
          selectedPiece.location = [-100, -100];
          turn = "black";
          this.hasMoved = true;
        }
        
        else if (this.hasMoved === false && getMouseTile()[1] === this.currentTile()[1] + 2 && getMouseTile()[0] === this.currentTile()[0] && !truePieceOffsetArray(whitePieces, [[0, 1], [0, 2]], this.currentTile()) && !truePieceOffsetArray(blackPieces, [[0, 1], [0, 2]], this.currentTile())){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          turn = "black";
          this.hasMoved = true;
          }
        else if ((getMouseTile()[1] === this.currentTile()[1] + 1 && getMouseTile()[0] === this.currentTile()[0]) && !(trueIfPieceOffset(whitePieces, 0, 1, this.currentTile()) || trueIfPieceOffset(blackPieces, 0, 1, this.currentTile()))){
        this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
        turn = "black";
        this.hasMoved = true;
        }
    
      }

      else{

        if (trueIfPiece(whitePieces, [this.currentTile()[0]+ 1 , this.currentTile()[1] - 1]) && getMouseTile()[0] === this.currentTile()[0]+ 1 && getMouseTile()[1] === this.currentTile()[1] - 1 || trueIfPiece(whitePieces, [this.currentTile()[0]- 1 , this.currentTile()[1] - 1]) && getMouseTile()[0] === this.currentTile()[0] - 1 && getMouseTile()[1] === this.currentTile()[1] - 1){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          scanForPiece(whitePieces, this.currentTile());
          selectedPiece.location = [-100, -100];
          turn = "white";
          this.hasMoved = true;
        }

        else if (this.hasMoved === false && getMouseTile()[1] === this.currentTile()[1] -2 && getMouseTile()[0] === this.currentTile()[0] && !truePieceOffsetArray(whitePieces, [[0, -1], [0, -2]], this.currentTile()) && !truePieceOffsetArray(blackPieces, [[0, -1], [0, -2]], this.currentTile())){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          turn = "white";
          this.hasMoved = true;
          }
        else if (getMouseTile()[1] === this.currentTile()[1] - 1 && getMouseTile()[0] === this.currentTile()[0]&& !(trueIfPieceOffset(whitePieces, 0, -1, this.currentTile()) || trueIfPieceOffset(blackPieces, 0, -1, this.currentTile()))){
        this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
        turn = "white";
        this.hasMoved = true;
      }
      
    }
      

    }
    draw(){
      fill(this.colour);
      if (this.team === "white"){
        stroke(0);
      }
      else{
        stroke(255);
      }
      strokeWeight(1.2);
      circle(this.location[0], this.location[1], WinSize/8.5);
    }
  }
  class knight{
    constructor(location, team, colour) {
      this.team = team;
      this.location = location;
      
      this.colour = colour;
    }
    currentTile(){
      return XYToTile(this.location[0], this.location[1]);
    }  
    move(){
      if (turn === "white"){

        if ( trueIfAnyEqual(getMouseTile(), [[2, 1][1,2][-2, 1][1,-2][-1, -2][-1, 2][-2, -1][2, -1]]&& !truePieceOffsetArray(whitePieces, [[2, 1],[1,2],[-2, 1],[1,-2],[-1, -2],[-1, 2],[-2, -1],[2, -1]]))){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          scanForPiece(blackPieces, this.currentTile());
          selectedPiece.location = [-100, -100];
          turn = "black";
        }

        }
    
      

      else{

        if (trueIfPiece(whitePieces, [this.currentTile()[0]+ 1 , this.currentTile()[1] - 1]) && getMouseTile()[0] === this.currentTile()[0]+ 1 && getMouseTile()[1] === this.currentTile()[1] - 1 || trueIfPiece(whitePieces, [this.currentTile()[0]- 1 , this.currentTile()[1] - 1]) && getMouseTile()[0] === this.currentTile()[0] - 1 && getMouseTile()[1] === this.currentTile()[1] - 1){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          scanForPiece(whitePieces, this.currentTile());
          selectedPiece.location = [-100, -100];
          turn = "white";
        }

        else if (this.hasMoved === false && getMouseTile()[1] === this.currentTile()[1] -2 && getMouseTile()[0] === this.currentTile()[0] && !truePieceOffsetArray(whitePieces, [[0, -1], [0, -2]], this.currentTile()) && !truePieceOffsetArray(blackPieces, [[0, -1], [0, -2]], this.currentTile())){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          turn = "white";
          }
        else if (getMouseTile()[1] === this.currentTile()[1] - 1 && getMouseTile()[0] === this.currentTile()[0]&& !(trueIfPieceOffset(whitePieces, 0, -1, this.currentTile()) || trueIfPieceOffset(blackPieces, 0, -1, this.currentTile()))){
        this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
        turn = "white";
      }
      
    }
  
      

    }
}
  WinSize = Math.min(windowWidth, windowHeight);
  createCanvas(WinSize, WinSize);
  black = false;
  blackStart = false;
  turn = "white"
  pieceSelected = false;
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
        black = true;
      }
       square(WinSize/8*x, WinSize/8*y, WinSize/8);
    }
  }
}

function drawPieces(){
  for (let piece = 0; piece < whitePieces.length; piece++) {
    const element = whitePieces[piece];
    whitePieces[piece].draw();
  }

  for (let piece = 0; piece < blackPieces.length; piece++) {
    const element = blackPieces[piece];
    blackPieces[piece].draw();
    
  }
}

function draw() {

  drawBoard();
  drawPieces();

}

function scanForPiece(team, selectedTile){
  for (let piece = 0; piece < team.length; piece++) {
    const element = team[piece];
    // print(XYToTile(whitePieces[piece].location[0], whitePieces[piece].location[1]));
    if (team[piece].currentTile()[0] === selectedTile[0] && team[piece].currentTile()[1] === selectedTile[1]){
      selectedPiece = team[piece];
      selectedPiece.colour = 100;
      pieceSelected = true;
      print("piece selected!");
      }
    }
  }

function trueIfPiece(team, selectedTile){
  for (let piece = 0; piece < team.length; piece++) {
    const element = team[piece];
    if (team[piece].currentTile()[0] === selectedTile[0] && team[piece].currentTile()[1] === selectedTile[1]){
      // print(team[piece].currentTile()[0] === selectedTile[0]);
      // print(team[piece].currentTile()[0] === selectedTile[0] && team[piece].currentTile()[1] === selectedTile[1]);
      return true;
      }
    
  }
  return false;
}

function trueIfPieceOffset(team, offsetX, offsetY, thisTile){
  return (trueIfPiece(team, [thisTile[0] + offsetX, thisTile[1] + offsetY]));
}
function truePieceOffsetArray(team, offsetsXY, thisTile){
  let pointsArray = offsetsXY;
  for (let i = 0; i < pointsArray.length; i++) {
    const element = pointsArray[i];
    if (trueIfPieceOffset(team, pointsArray[i][0], pointsArray[i][1], thisTile)){
      return true;
    }
  }
  return false;
}

function trueIfAnyEqual(comparedValue, array){
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (comparedValue === array[i]){
      return true;
    }
    
  }
  return false;
}
function mouseClicked(){
  if (pieceSelected === false){

  
    if (turn === "white"){
      scanForPiece(whitePieces,getMouseTile());
      }

    else if (turn === "black"){
      scanForPiece(blackPieces, getMouseTile());
    }
  }
  else{
 
    
    
    

    if (selectedPiece.team === "white"){
      selectedPiece.colour = 255;
    }
    else {
      selectedPiece.colour = 0;
    }

    selectedPiece.move();
    
    pieceSelected = false;
  }

}
