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
let whiteKnightOne, whiteKnightTwo;
let blackPawnOne, blackPawnTwo, blackPawnThree, blackPawnFour, blackPawnFive, blackPawnSix, blackPawnSeven, blackPawnEight;
let blackKnightOne, blackKnightTwo;
let turn;
let selectedPiece;
let font;

function preload() {
  font = loadFont('Inconsolata.ttf');
}

let points;
let bounds;

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

  points = font.textToPoints('\u2658', 0, 0, 10, {
    sampleFactor: 5,
    simplifyThreshold: 0
  });
  bounds = font.textBounds('\u2658 ', 0, 0, 10);

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
    constructor(location, team) {
      this.team = team;
      this.location = location;
      
      // this.colour = colour;
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
    draw(){
      let knightFill;
      let knightBorder;
      if (this.team === "black"){
      knightFill = "0";
      knightBorder = "255"
      }
      else if (this.team === "white"){
      knightFill = "255";
      knightBorder = "0";
      }
      strokeWeight(WinSize/90);
      textSize(WinSize/7);
      fill(knightFill);
      text("\u2658", this.location[0], this.location[1] + WinSize/75);
      textSize(WinSize/14);
      strokeWeight(WinSize/40)
      text("\u2658", this.location[0], this.location[1] + WinSize/75);
      strokeWeight(1);  
      fill(knightBorder);
      textSize(WinSize/6.5);
      text("\u2658", this.location[0], this.location[1] + WinSize/75);
    }
}
  WinSize = Math.min(windowWidth, windowHeight);
  createCanvas(WinSize, WinSize);
  black = false;
  blackStart = false;
  turn = "white"
  pieceSelected = false;
  whitePieces = [whitePawnOne, whitePawnTwo, whitePawnThree, whitePawnFour, whitePawnFive, whitePawnSix, whitePawnSeven, whitePawnEight, whiteKnightOne, whiteKnightTwo];
  blackPieces = [blackPawnOne, blackPawnTwo, blackPawnThree, blackPawnFour, blackPawnFive, blackPawnSix, blackPawnSeven, blackPawnEight, blackKnightOne, blackKnightTwo];

  for (let pawn = 0; pawn < 9; pawn++) {
    const element = whitePieces[pawn];
    whitePieces[pawn] = new Pawn(tileToXY(pawn+1, 2),"white", 255);
  }
  whiteKnightOne = new knight(tileToXY(2, 1), "white");
  whiteKnightTwo = new knight(tileToXY(7, 1), "white");
  for (let pawn = 0; pawn < 9; pawn++) {
    const element = blackPieces[pawn];
    blackPieces[pawn] = new Pawn(tileToXY(pawn+1, 7), "black", 0);
  }
  blackKnightOne = new knight(tileToXY(2, 8), "black");
  blackKnightTwo = new knight(tileToXY(7, 8), "black");

  
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
  print(WinSize)
  drawBoard();
  drawPieces();
  textAlign(CENTER, CENTER);



  // strokeWeight(1);
  // textSize(WinSize/6);
  // text("\u2658", tileToXY(2,1)[0], tileToXY(2,1)[1]);

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
