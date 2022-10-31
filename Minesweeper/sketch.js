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

 let gameOver = false;
 let lastTime = 0;
 let canvas;
 let points = 0;
 let maxPoints = 0;
 let cell = {
   cellX: 0,
   cellY: 0,
   isMine: false
 }
 
 let cellsList = [];
 let rowLength = 10;
 let collumnLength = 10;
 let boardSize;
 function setup() {
   boardSize = min(windowWidth, windowHeight);
   canvas = createCanvas(boardSize, boardSize);
   canvas.center("horizontal")
  makeGrid()
  massMineMaker();
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
  else{

  }
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
  textAlign(CENTER, CENTER)
  fill(0)
  textSize(100)
  print(text( round(points/maxPoints), boardSize/2, boardSize/2))
 }



 /**
  * draws all cells inside of the cellsList variable.
  */

function drawCells(){
   
   for (let y = 0; y < rowLength; y++) {
     for (let x = 0; x < collumnLength; x++) {
     const element = cellsList[y][x];
 
     if (element.isMine){
      fill(255, 0, 0)
     }

     else{
       fill(255);
     }
     square((element.cellX - 1)* boardSize/collumnLength, (element.cellY - 1)* boardSize/rowLength, boardSize/min(rowLength, collumnLength));
   }
 }
 }
 /**
  * returns the object related to the coordinates placeX and placeY
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
     if (floor(placeX * rowLength / boardSize) + 1 === element.cellX && floor(placeY * rowLength / boardSize) + 1 === element.cellY){
       
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
   if(!(mouseX> 0 && mouseY > 0 && mouseX < boardSize && mouseY < boardSize)){
   return
  }
   // print(lookForCell(mouseX, mouseY));
   if(lookForCell(mouseX, mouseY).isBlack && lookForCell(mouseX, mouseY).isColour){
    points += 5;
   }
   else if(lookForCell(mouseX, mouseY).isBlack){
    points += 1;
   }
   else{
    points-= 2;
   }
   lookForCell(mouseX, mouseY).isBlack = false;

 
 
 
 }
function keyPressed(){
   gameOn = true;
 }
