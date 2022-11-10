// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// auto captioning docstring!!!!:
/**
 * Adds two numbers.
 * @param {number} num1 The first number to add.
 * @param {number} num2 The second number to add.
 * @return {number} The result of adding num1 and num2.
 */
 let example;
 let lastTrigger = 0;
let hasWon = false
 let gameOver = false;
 let lastTime = 0;
 let canvas;
 let points = 0;
 let maxPoints = 0;
 let firstMove = true;
 let cell = {
   cellX: 0,
   cellY: 0,
   isMine: false,
   isSweeped: false,
   isFlagged: false,
   adjMines: 0,

 }
 
 let cellsList = [];
 let rowLength = 10;
 let collumnLength = 10;
 let boardSize;
 function setup() {
    for (let element of document.getElementsByClassName("p5Canvas")) {
      element.addEventListener("contextmenu", (e) => e.preventDefault());
    }

   boardSize = min(windowWidth, windowHeight);
   canvas = createCanvas(boardSize, boardSize);
   canvas.center("horizontal")
  makeGrid()
  massMineMaker();
  textAlign(CENTER)
 }

 function makeGrid(){
  cellsList = [];
  for (let y = 0; y < rowLength; y++) {
    let newCellRow = []
    for (let x = 0; x < collumnLength; x++) {

      let newCell = {...cell};

      newCell.cellX = x + 1;
      newCell.cellY = y + 1;


      newCellRow.push(newCell);

    }
    cellsList.push([...newCellRow])
  }
  print(cellsList.length);
  print(cellsList);
  strokeWeight(2);
 }

 function windowResized(){
  boardSize = min(windowWidth, windowHeight);
  resizeCanvas(boardSize, boardSize);
  canvas.center("horizontal");
 }

 function draw() {
  background(220);
  drawCells();
  if(gameOver){
    endScreen();
  }
  else if(hasWon){
    winScreen();
  }
  if(millis() - lastTrigger > 2000 && !gameOver && !hasWon){
    AutoMineSweep();
    lastTrigger = millis();
  }
  // else{

  // }

}

function mineMaker(){
  let newMine = cellsList[floor(random(rowLength))][floor(random(collumnLength))]

  print("mines are actually trying to be made")
  if (newMine.isMine === false){
    print("mine made!")
    newMine.isMine = true;
  }
  else{
    mineMaker();
  }
}
function massMineMaker(){
  let minesCount = floor(random(max(rowLength, collumnLength), max(rowLength, collumnLength) + min(rowLength, collumnLength)/2 ));
  print(minesCount);
  for (let i = 0; i < minesCount; i++){
    print("running mineMaker");
    mineMaker();
  }

}
function tileNumberer(cell){

  for (let y = 0; y < rowLength; y++) {
    for (let x = 0; x < collumnLength; x++) {
      const element = cellsList[y][x];
      if (cellsList.isMine === true){
        
      }

    }

    
  }
}


function endScreen(){

  fill(0)
  textSize(50)
  print(text( "you lost", boardSize/2, boardSize/2))
 }


function winScreen(){

  fill(0)
  textSize(50)
  print(text( "you won", boardSize/2, boardSize/2))
 }

 /**
  * draws all cells inside of the cellsList variable.
  */

function drawCells(){
   textSize(boardSize/20)
   for (let y = 0; y < rowLength; y++) {
     for (let x = 0; x < collumnLength; x++) {
     const element = cellsList[y][x];
    //  gameOver && 
     if (element.isMine){
      fill(255, 0, 0);
     }

     else if(element.isSweeped){
       fill(0, 255, 0);
     }
     else{
      fill(255);
     }
     square((element.cellX - 1)* boardSize/collumnLength, (element.cellY - 1)* boardSize/rowLength, boardSize/min(rowLength, collumnLength));

     if (element.isSweeped){
    fill(0)
    text(element.adjMines, (element.cellX - .5)* boardSize/collumnLength, (element.cellY-.35)* boardSize/rowLength);
    fill(255)
    }
    
   }
 }
 }

function calcAdjMines(cell){
  let adjMinesCount = 0;
  // print(boardSize);
  for (let y = -1; y < 2; y++) {
    for (let x = -1; x < 2; x++) {
      if(x !== 0 || y !== 0){
      

      // print([floor((cell.cellX + x) * boardSize/rowLength) , floor((cell.cellY + y) * boardSize/collumnLength)]);
      // print([cell.cellX + x, cell.cellY + y]);

      if(lookForCell((cell.cellX + x - 1) * boardSize/rowLength, (cell.cellY + y- 1) * boardSize/collumnLength) !== undefined && lookForCell((cell.cellX + x- 1) * boardSize/rowLength, (cell.cellY + y- 1) * boardSize/collumnLength).isMine){
        
        adjMinesCount++;
        print([floor((cell.cellX + x)), floor((cell.cellY + y))] + " is a mine")
      }
    }
    }
  }

  cell.adjMines = adjMinesCount;
  cell.isSweeped = true;

  if (adjMinesCount === 0){
    for (let y = -1; y < 2; y++) {
      for (let x = -1; x < 2; x++) {
        print(lookForCell((cell.cellX + x - 1) * boardSize/rowLength, (cell.cellY + y- 1) * boardSize/collumnLength));
        print(lookForCell((cell.cellX + x - 1) * boardSize/rowLength, (cell.cellY + y- 1) * boardSize/collumnLength) !== undefined && lookForCell((cell.cellX + x - 1) * boardSize/rowLength, (cell.cellY + y- 1) * boardSize/collumnLength).isSweeped !== true)
        if((x !== 0 || y !== 0) && lookForCell((cell.cellX + x - 1) * boardSize/rowLength, (cell.cellY + y- 1) * boardSize/collumnLength) !== undefined && lookForCell((cell.cellX + x - 1) * boardSize/rowLength, (cell.cellY + y- 1) * boardSize/collumnLength).isSweeped !== true){
        calcAdjMines(lookForCell((cell.cellX + x - 1) * boardSize/rowLength, (cell.cellY + y- 1) * boardSize/collumnLength));
        }
      }
    }
  }

}
 /**
  * returns the cell object related to the coordinates placeX and placeY
  * 
  * @param {number} placeX The x coordinate searched
  * @param {number} placeY The y coordinate searched
  *  
  */
function lookForCell(placeX, placeY){
   for (let y = 0; y < rowLength; y++) {
     for (let x = 0; x < collumnLength; x++) {
     const element = cellsList[y][x];
     // print(floor(placeX * 5 / boardSize) + 1 === element.cellX && floor(placeY * 5 / boardSize) + 1 === element.cellY);
     if (floor(placeX * rowLength / boardSize) + 1 === element.cellX && floor(placeY * collumnLength / boardSize) + 1 === element.cellY){
       
       return element;
     }
   }
 }
   return undefined;
 }
 
 /**
  * Triggered when mouse is Clicked. 
  */


function mousePressed(){
print(mouseButton);
  if (mouseButton === LEFT) {
    sweepMine(mouseX, mouseY);
    if(firstMove){
      firstMove = false;
  }
  if (mouseButton === RIGHT) {
    print('test')
    flagMine(mouseX, mouseY);
  }
  if (mouseButton === CENTER) {
 
  }

  }

 }

function sweepMine(x, y){
  if(!(x> 0 && y > 0 && x < boardSize && y < boardSize && !(gameOver || hasWon))){
    return
   }
    print([lookForCell(x, y).cellX, lookForCell(x, y).cellY]);
 
    lookForCell(x, y).isBlack = false;
 
    if(!lookForCell(x, y).isMine && !lookForCell(x, y).isFlagged){
     calcAdjMines(lookForCell(x, y));
     lookForCell(x, y).isSweeped = true;
    }
    else if(firstMove && !lookForCell(x, y).isFlagged){
      lookForCell(x, y).isMine = false;
      mineMaker();
      calcAdjMines(lookForCell(x, y));
    }
    else if (!lookForCell(x, y).isFlagged){
     gameOver = true;
    }

    if(winCheck()){
     hasWon = true;
    }
}

function flagMine(x, y){
  if(!(x> 0 && y > 0 && x < boardSize && y < boardSize && !(gameOver || hasWon))){
    return
   }

   lookForCell(x, y).isFlagged = !lookForCell(x, y).isFlagged;
   if(lookForCell(x, y).isFlagged){
    print("mine flagged!")
    }
   else{
    print("mine unflagged!")
   }
}

function winCheck(){
  for (let y = 0; y < rowLength; y++) {
    for (let x = 0; x < collumnLength; x++) {
      if (!cellsList[y][x].isSweeped && !cellsList[y][x].isMine){
        return false;
      }
    }
  }
  return true;
}

function AutoMineSweep(){

  let biggestAdjSweeped = 0;
  let chosenOne = undefined;

  for (let y = 0; y < rowLength; y++) {
    for (let x = 0; x < collumnLength; x++) {
      const element = cellsList[y][x];
      if(!element.isSweeped){
        let adjSweepedCount = 0;

          for (let y = -1; y < 2; y++) {
            for (let x = -1; x < 2; x++) {
              if(x !== 0 || y !== 0){

              if(lookForCell((cell.cellX + x - 1) * boardSize/rowLength, (cell.cellY + y- 1) * boardSize/collumnLength) !== undefined && lookForCell((cell.cellX + x- 1) * boardSize/rowLength, (cell.cellY + y- 1) * boardSize/collumnLength).sweeped){
                
                adjSweepedCount++;
                print([floor((cell.cellX + x)), floor((cell.cellY + y))] + " is sweeped")
              }
            }
            
            }
          }

        if(element.adjSweepedCount > biggestAdjSweeped){
          biggestAdjSweeped = element.adjMines;
          chosenOne = element;
        }
      }
    }
  }
  if(chosenOne === undefined){
    return;
  }

  sweepMine(chosenOne.cellX*boardSize/rowLength, chosenOne.cellY*boardSize/collumnLength);


}
