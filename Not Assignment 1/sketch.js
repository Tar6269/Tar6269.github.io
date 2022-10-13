// Project Title
//  Chess (milestone submission)
// Your Name
//  Taran Rengarajan
// Date
//  13/10/22
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// large amount of work put in, object oriented programming
//initializing variables
let WinSize;
let whitePieces, blackPieces;
let whitePawnOne, whitePawnTwo, whitePawnThree, whitePawnFour, whitePawnFive, whitePawnSix, whitePawnSeven, whitePawnEight;
let whiteKnightOne, whiteKnightTwo;
let whiteRookOne, whiteRookTwo;
let blackPawnOne, blackPawnTwo, blackPawnThree, blackPawnFour, blackPawnFive, blackPawnSix, blackPawnSeven, blackPawnEight;
let blackKnightOne, blackKnightTwo;
let blackRookOne, blackRookTwo;
let turn;
let selectedPiece;
let firstTime = true;
let canvas
function preload() {

}



function getMouseTile(){
  /** Returns the coordinates on an 8x8 board of the tile the mouse is hovering over*/ 
  let tileX = floor(map(mouseX, 0, width, 0, 8))+ 1;
  let tileY = floor(map(mouseY, 0, height, 0, 8)) + 1;
  
  return [tileX, tileY];
}
function tileToXY(tileWidth, tileHeight){
  /** converts a set of 8x8 tile coordinates to the middle of the respective tile's javascript coordinates*/
  let tileX = map(tileWidth -0.5, 0, 8, 0, width);
  let tileY = map(tileHeight -0.5, 0, 8, 0, height);

  return [tileX, tileY];
}
function XYToTile(tileWidth, tileHeight){
  /** gets the 8x8 coordinates of the tile that the given javascript coordinates are on*/
  let tileX = floor(map(tileWidth, 0, width, 0, 8))+ 1;
  let tileY = floor(map(tileHeight, 0, height, 0, 8)) + 1;

  return [tileX, tileY];
}
function setup() {
  textAlign(CENTER, CENTER);
  if (firstTime === true){
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

        if (trueIfPiece(blackPieces, [this.currentTile()[0]+ 1 , this.currentTile()[1] - 1]) && getMouseTile()[0] === this.currentTile()[0]+ 1 && getMouseTile()[1] === this.currentTile()[1] - 1 || trueIfPiece(blackPieces, [this.currentTile()[0]- 1 , this.currentTile()[1] - 1]) && getMouseTile()[0] === this.currentTile()[0] - 1 && getMouseTile()[1] === this.currentTile()[1] - 1){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          scanForPiece(blackPieces, this.currentTile());
          selectedPiece.location = [-100, -100];
          turn = "black";
          this.hasMoved = true;
        }
        
        else if (this.hasMoved === false && getMouseTile()[1] === this.currentTile()[1] - 2 && getMouseTile()[0] === this.currentTile()[0] && !truePieceOffsetArray(whitePieces, [[0, -1], [0, -2]], this.currentTile()) && !truePieceOffsetArray(blackPieces, [[0, -1], [0, -2]], this.currentTile())){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          turn = "black";
          this.hasMoved = true;
          }
        else if ((getMouseTile()[1] === this.currentTile()[1] - 1 && getMouseTile()[0] === this.currentTile()[0]) && !(trueIfPieceOffset(whitePieces, 0, -1, this.currentTile()) || trueIfPieceOffset(blackPieces, 0, -1, this.currentTile()))){
        this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
        turn = "black";
        this.hasMoved = true;
        }
    
      }

      else{

        if (trueIfPiece(whitePieces, [this.currentTile()[0]+ 1 , this.currentTile()[1] + 1]) && getMouseTile()[0] === this.currentTile()[0]+ 1 && getMouseTile()[1] === this.currentTile()[1] + 1 || trueIfPiece(whitePieces, [this.currentTile()[0]- 1 , this.currentTile()[1] + 1]) && getMouseTile()[0] === this.currentTile()[0] - 1 && getMouseTile()[1] === this.currentTile()[1] + 1){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          scanForPiece(whitePieces, this.currentTile());
          selectedPiece.location = [-100, -100];
          turn = "white";
          this.hasMoved = true;
        }

        else if (this.hasMoved === false && getMouseTile()[1] === this.currentTile()[1] + 2 && getMouseTile()[0] === this.currentTile()[0] && !truePieceOffsetArray(whitePieces, [[0, 1], [0, 2]], this.currentTile()) && !truePieceOffsetArray(blackPieces, [[0, 1], [0, 2]], this.currentTile())){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          turn = "white";
          this.hasMoved = true;
          }
        else if (getMouseTile()[1] === this.currentTile()[1] + 1 && getMouseTile()[0] === this.currentTile()[0]&& !(trueIfPieceOffset(whitePieces, 0, 1, this.currentTile()) || trueIfPieceOffset(blackPieces, 0, 1, this.currentTile()))){
        this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
        turn = "white";
        this.hasMoved = true;
        
      }
      
    }
      

    }
    draw(){
      let icon;
      fill(this.colour);
      if (this.team === "white"){
        stroke(100);
        icon = "\u2659";
      }
      else if(this.team === "black"){
        stroke(255);
        icon = "\u265F";
      }
      strokeWeight(3);
      text(icon, this.location[0], this.location[1] + WinSize/60);
    }
  }
  class knight{
    constructor(location, team) {
      this.team = team;
      this.location = location;

      if (this.team === "black"){
        this.colour = 0;
        this.knightBorder = 255;
      }

      else if (this.team === "white"){
      this.colour = 255;
      this.knightBorder = 0;

    }
    
  }
    currentTile(){
      return XYToTile(this.location[0], this.location[1]);
    }  
    move(){
      if (turn === "white"){

        if (ifOffsetArray(getMouseTile(), [[2, 1],[1,2],[-2, 1],[1,-2],[-1, -2],[-1, 2],[-2, -1],[2, -1]], this.currentTile()) && !trueIfPiece(whitePieces,  getMouseTile())){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          scanForPiece(blackPieces, this.currentTile());
          if (selectedPiece.team === "black"){
          selectedPiece.location = [-100, -100];
          }
          turn = "black";
        }

        }
      else if (turn === "black"){

        if (ifOffsetArray(getMouseTile(), [[2, 1],[1,2],[-2, 1],[1,-2],[-1, -2],[-1, 2],[-2, -1],[2, -1]], this.currentTile()) && !trueIfPiece(blackPieces,  getMouseTile())){
          this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
          scanForPiece(whitePieces, this.currentTile());
          if (selectedPiece.team === "white"){
          selectedPiece.location = [-100, -100];
          }
          turn = "white";
        }
    }
  }
    draw(){

      strokeWeight(WinSize/90);
      textSize(WinSize/7);

      if (this.team === "black"){

      stroke(this.colour);
      strokeWeight(WinSize/90);
      textSize(WinSize/7);
      fill(this.colour);
      text("\u2658", this.location[0], this.location[1] + WinSize/70);
      textSize(WinSize/14);
      strokeWeight(WinSize/40)
      text("\u2658", this.location[0], this.location[1] + WinSize/70);

      strokeWeight(1);  
      fill(this.knightBorder);
      stroke(this.knightBorder);
      textSize(WinSize/6.5);
      text("\u2658", this.location[0], this.location[1] + WinSize/70);
      stroke(255);
      }
      else if (this.team === "white"){

    
      fill(this.colour);
      stroke(this.colour);
      text("\u2658", this.location[0], this.location[1] + WinSize/70);
      textSize(WinSize/14);
      strokeWeight(WinSize/40)
      text("\u2658", this.location[0], this.location[1] + WinSize/70);
      strokeWeight(1);  
      fill(this.knightBorder);
      textSize(WinSize/6.5);
      text("\u2658", this.location[0], this.location[1] + WinSize/70);
      }

    }
} 
class Rook{
  constructor(location, team) {
    this.team = team;
    this.location = location;

    if (this.team === "black"){
      this.colour = 0;
      this.rookBorder = 255;
    }

    else if (this.team === "white"){
    this.colour = 255;
    this.rookBorder = 0;

  }
  
}
  currentTile(){
    return XYToTile(this.location[0], this.location[1]);
  }  
  move(){
    if (turn === "white"){
      // print(ifOffsetArray(getMouseTile(), [[0, 1],[0,2],[0, 3],[0,4],[0, 5],[0, 6],[0, 7],[0, 8],[0, -1],[0, -2],[0, -3],[0, -4],[0, -5],[0, -6],[0, -7],[0, -8],[1, 0],[2, 0],[3, 0],[4, 0][5, 0],[6, 0],[7, 0],[8, 0],[-1, 0],[-2, 0],[-3, 0],[-4, 0][-5, 0],[-6, 0],[-7, 0],[-8, 0]], this.currentTile()));
      print(truePieceBetweenOffset(whitePieces, getMouseTile()[0], "x",   this.currentTile()));
      print(truePieceBetweenOffset(whitePieces, getMouseTile()[1], "y", this.currentTile()));
      if (ifOffsetArray(getMouseTile(), [[0, 1],[0,2],[0, 3],[0,4],[0, 5],[0, 6],[0, 7],[0, 8],[0, -1],[0, -2],[0, -3],[0, -4],[0, -5],[0, -6],[0, -7],[0, -8],[1, 0],[2, 0],[3, 0],[4, 0][5, 0],[6, 0],[7, 0],[8, 0],[-1, 0],[-2, 0],[-3, 0],[-4, 0][-5, 0],[-6, 0],[-7, 0],[-8, 0]], this.currentTile()) && !truePieceBetweenOffset(whitePieces, getMouseTile()[0], "x",   this.currentTile()) && !truePieceBetweenOffset(whitePieces, getMouseTile()[1], "y", this.currentTile())){
        this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
        scanForPiece(blackPieces, this.currentTile());
        if (selectedPiece.team === "black"){
        selectedPiece.location = [-100, -100];
        }
        turn = "black";
      }

      }
    else if (turn === "black"){

      if (ifOffsetArray(getMouseTile(), [[2, 1],[1,2],[-2, 1],[1,-2],[-1, -2],[-1, 2],[-2, -1],[2, -1]], this.currentTile()) && !trueIfPiece(blackPieces,  getMouseTile())){
        this.location = tileToXY(getMouseTile()[0], getMouseTile()[1]);
        scanForPiece(whitePieces, this.currentTile());
        if (selectedPiece.team === "white"){
        selectedPiece.location = [-100, -100];
        }
        turn = "white";
      }
  }
}
  draw(){

    strokeWeight(WinSize/90);
    textSize(WinSize/7);

    if (this.team === "black"){

    fill(this.colour);
    stroke(this.rookBorder);

    text("\u265C", this.location[0], this.location[1] + WinSize/70);
    
    strokeWeight(1);
    stroke(255);
    }
    else if (this.team === "white"){

  
    fill(this.colour);
    stroke(this.rookBorder);
    text("\u2656", this.location[0], this.location[1] + WinSize/70);
    strokeWeight(1);
    stroke(255);

    }
  }
} 
  WinSize = Math.min(windowWidth, windowHeight);
  canvas = createCanvas(WinSize, WinSize);
  black = false;
  blackStart = false;
  turn = "white"
  pieceSelected = false;
  whitePieces = [whitePawnOne, whitePawnTwo, whitePawnThree, whitePawnFour, whitePawnFive, whitePawnSix, whitePawnSeven, whitePawnEight, whiteKnightOne, whiteKnightTwo, whiteRookOne, whiteRookTwo]; 
  blackPieces = [blackPawnOne, blackPawnTwo, blackPawnThree, blackPawnFour, blackPawnFive, blackPawnSix, blackPawnSeven, blackPawnEight, blackKnightOne, blackKnightTwo, blackRookOne, blackRookTwo];

  for (let pawn = 0; pawn < 9; pawn++) {
    const element = whitePieces[pawn];
    whitePieces[pawn] = new Pawn(tileToXY(pawn+1, 7),"white", 255);
  }
  whitePieces[9] = new knight(tileToXY(2, 8), "white");
  whitePieces[10] = new knight(tileToXY(7, 8), "white");

  whitePieces[11] = new Rook(tileToXY(1, 8), "white");
  whitePieces[12] = new Rook(tileToXY(8, 8), "white");
  for (let pawn = 0; pawn < 9; pawn++) {
    const element = blackPieces[pawn];
    blackPieces[pawn] = new Pawn(tileToXY(pawn+1, 2), "black", 0);
  }
  blackPieces[9] = new knight(tileToXY(2, 1), "black");
  blackPieces[10] = new knight(tileToXY(7, 1), "black");

  blackPieces[11] = new Rook(tileToXY(1, 1), "black");
  blackPieces[12] = new Rook(tileToXY(8, 1), "black");
  firstTime = !firstTime;
}

canvas = createCanvas(WinSize, WinSize);
}
function windowResized(){
  setup();
}
function drawBoard(){
/**Draws the checkerboard pattern of a chessboard. Goes at start of draw loop. */
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
  /**Calls the .draw() function of each piece in each team. goes in draw loop. */
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
  /** Runs through each of a team's piece locations, and sets the "selectedPiece" variable to a piece if there is one*/
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
  /**Returns true if there is a piece at a specified tile. */
  for (let piece = 0; piece < team.length; piece++) {
    const element = team[piece];
    if (team[piece].currentTile()[0] === selectedTile[0] && team[piece].currentTile()[1] === selectedTile[1]){

      return true;
      }
    
  }
  return false;
}

function trueIfPieceOffset(team, offsetX, offsetY, thisTile){
  /**returns true if there is a piece at the offset for thisTile */
  return (trueIfPiece(team, [thisTile[0] + offsetX, thisTile[1] + offsetY]));
}
function truePieceOffsetArray(team, offsetsXY, thisTile){
  /**returns true if there is a piece at an array of offsets for thisTile */
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
  /**Compares the values of an array or tuples to a single inputted tuple, returns true if any in the array are equal to comparedValue*/
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (comparedValue[0] === array[i][0] && comparedValue[1] === array[i][1]){
      return true;
    }
    
  }
  return false;
}
function ifOffsetArray(comparedValue, offsets, tileOfOffsets){
  /** Returns true if comparedValue is equal to the value of the tile of the offsets of tileOfOffsets*/
  for (let i = 0; i < offsets.length; i++) {
    const element = offsets[i];
    offsets[i][0] = tileOfOffsets[0] + offsets[i][0];
    offsets[i][1] = tileOfOffsets[1] + offsets[i][1];

    if (offsets[i][0] === comparedValue[0] && offsets[i][1] === comparedValue[1]){
      return true;
    }
  }

return false;
}


function truePieceBetweenOffset(team, offset, XOrY, thisTile){
  /** Returns true if there is a piece between two points in a horizontal or vertical axis */
  let x = 0;
  let y = 0;
  let isX;
  let negativeMultiplier = 1;

  if (XOrY === "x"){
    isX = true;
  }
  else if (XOrY === "y"){
    isX = false;
  }

  if (offset < 0){
    negativeMultiplier = -1;
  }

  for (let i = 1; i <= abs(offset); i++) {
    if (isX === true){
      x = i * negativeMultiplier;
      y = 0;
    }
    else if (isX === false){
      x = 0;
      y = i * negativeMultiplier;
    }
    print(i * negativeMultiplier);
    print(trueIfPieceOffset(team, x, y, thisTile));
    if (trueIfPieceOffset(team, x, y, thisTile)){
      return true;
    }
  }
  return false;
}
// W.I.P. function
// getOffset(newTile, thisTile){
  
// }

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
