// Minesweeper + auto play
// Taran
// 14/11/2022
//
// Extra for Experts:
  // uses recursive backtracking to make sure generated mines do not happen in the same spot, automatic playing algorithm

// instructions:
// click to check a tile for mines
// e to toggle auto play
// f flags a square
// l reveals all mine locations

 let lastAutoSweeped;
 let lastTrigger = 0;
let hasWon = false
 let gameOver = false;
 let lastTime = 0;
 let canvas;
 let points = 0;
 let maxPoints = 0;
 let firstMove = true;
 let autoplaying = false;
 let showMines = false;
 let cell = {
   cellX: 0,
   cellY: 0,
   isMine: false,
   isSweeped: false,
   isFlagged: false,
   adjMines: 0,
   ignore: false,
   losingMine: false,
 }
 
 let cellsList = [];
 let rowLength = 10;
 let collumnLength = 10;
 let boardSize;
 function setup() {
  // disables right click menu within canvas
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
  if(millis() - lastTrigger > 2000 && !gameOver && !hasWon && autoplaying){
    AutoMineSweep();
    lastTrigger = millis();
  }
  // else{

  // }

}
/**
 * creates one mine each time ran, does not overlap
 */
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

/**
 * loss screen display
 */

function endScreen(){

  fill(0)
  textSize(50)
  print(text( "you lost", boardSize/2, boardSize/2))
 }

/**
 * win screen display
 */
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
    if(element.isFlagged){
      fill(255, 125, 0)
    }
    else if (element.isMine && element.losingMine){
      fill(0, 0, 0);
     }
     else if (element.isMine && (showMines || gameOver)){
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
/**
 * updates the adjMines property of a tile.
 * @param {*} cell cell Object reference
 */
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


function mouseClicked(){
    sweepMine(mouseX, mouseY);
 }

function keyPressed(){
  if(key === "f"){

    flagMine(mouseX, mouseY);
  }
  if(key === "e"){
 
    autoplaying = !autoplaying;
    if(autoplaying){
      stroke(0, 125, 125);
    }
    else{
      stroke(0, 0, 0);
    }
  }
  if(key === "l"){
    showMines = !showMines;
  }


}
/**
 * sweeps tile at given coordinates to show player if it is a mine or not. chosen tile will be green if swept
 * @param {*} x x coordinate
 * @param {*} y y coordinate
 *  
 */
function sweepMine(x, y){
  if(!(x> 0 && y > 0 && x < boardSize && y < boardSize && !(gameOver || hasWon))){
    return
   }


    print([lookForCell(x, y).cellX, lookForCell(x, y).cellY]);
 
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
     lookForCell(x, y).losingMine = true;
    }

    if(winCheck()){
     hasWon = true;
    }
    if(firstMove){
      firstMove = false;
  }
}
/**
 * flags mine at given coordinates
 * 
 * @param {*} x x coordinate
 * @param {*} y y coordinate
 * 
 */
function flagMine(x, y){
  if(!(x> 0 && y > 0 && x < boardSize && y < boardSize && !(gameOver || hasWon))){
    return;
   }

   lookForCell(x, y).isFlagged = !lookForCell(x, y).isFlagged;
   if(lookForCell(x, y).isFlagged){
    print("mine flagged!");
    }
   else{
    print("mine unflagged!");
   }
}
/**
 * 
 * @returns true if game has been won
 */
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
  print("trying to autosweep");
  let smallestAdjCellsAdjMines = 9999;
  let chosenOne = undefined;
if(firstMove){
  print("first move!")
  chosenOne = cellsList[floor(random(rowLength))][floor(random(collumnLength))];
  // chosenOne = cellsList[1][1];

  print(chosenOne);
  lastAutoSweeped = chosenOne;
}
else{
  // print([(lastAutoSweeped.cellX - 2) * boardSize/rowLength, (lastAutoSweeped.cellY - 1) * boardSize/collumnLength])
  // chosenOne = lookForCell((lastAutoSweeped.cellX - 2) * boardSize/rowLength, (lastAutoSweeped.cellY - 1) * boardSize/collumnLength);
  for (let y = 0; y < rowLength; y++) {
    for (let x = 0; x < collumnLength; x++) {
      const element = cellsList[y][x];
      if(!element.isSweeped && !element.isFlagged){
        let adjCellsAdjMinesTotal = 0;
        let isSurrounded = true;
          for (let y = -1; y < 2; y++) {
            for (let x = -1; x < 2; x++) {
              if(x !== 0 || y !== 0){

                if(lookForCell((element.cellX + x- 1) * boardSize/rowLength, (element.cellY + y- 1) * boardSize/collumnLength) !== undefined){
                  
                  if(lookForCell((element.cellX + x- 1) * boardSize/rowLength, (element.cellY + y- 1) * boardSize/collumnLength).isSweeped){
                    
                    adjCellsAdjMinesTotal+= lookForCell((element.cellX + x- 1) * boardSize/rowLength, (element.cellY + y- 1) * boardSize/collumnLength).adjMines ;
                    print([floor((element.cellX + x)), floor((element.cellY + y))] + " is sweeped")

                
              }
              if(lookForCell((element.cellX + x- 1) * boardSize/rowLength, (element.cellY + y- 1) * boardSize/collumnLength).adjMines === 0){
                isSurrounded = false;
              }
            }
            else{
              adjCellsAdjMinesTotal += 1;
            }
            }
            
            }
          }
          // print(adjCellsAdjMinesTotal);
          if (adjCellsAdjMinesTotal === 0){
            adjCellsAdjMinesTotal = 9999;
          }
          // makes bot more likely to win
          if(element.isMine){

            adjCellsAdjMinesTotal *=1.3;
          }
          if (isSurrounded){
            adjCellsAdjMinesTotal += 10;
          }
          
        if(adjCellsAdjMinesTotal < smallestAdjCellsAdjMines){
          smallestAdjCellsAdjMines = adjCellsAdjMinesTotal;
          chosenOne = element;
        }

        
      }
    }
  }
}
print(chosenOne);
  if(chosenOne === undefined){
    return;
  }
  print(chosenOne.cellX - 1)
  print(chosenOne.cellY - 1)
  sweepMine((chosenOne.cellX - 1)*boardSize/rowLength + 1, (chosenOne.cellY - 1)*boardSize/collumnLength + 1);



}
