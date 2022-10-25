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

 let gameOn = false;
 let lastTime = 0;
 let canvas;
 
 let cell = {
   cellX: 0,
   cellY: 0,
   isBlack: false
 }
 
 let cellsList = [];
 let rowLength = 11;
 let rowWidth = 11;
 let boardSize;
 function setup() {
   boardSize = min(windowWidth, windowHeight);
   canvas = createCanvas(boardSize, boardSize);
   canvas.center("horizontal")
   for (let y = 0; y < rowLength; y++) {
     let newCellRow = []
     for (let x = 0; x < rowWidth; x++) {
 
       let newCell = {...cell};
 
       newCell.cellX = x + 1;
       newCell.cellY = y + 1;
 
       newCellRow.push(newCell);
       // print(cellsList[x]);
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
  //  if (millis() - lastTime > 2000){
  //  if (gameOn){

  //  lastTime = millis() + 2000;
  //  }
  //  }
   // square(boardSize/2, boardSize/2, boardSize/5);
 }
 
 /**
  * draws all cells inside of the cellsList variable.
  */

 function drawCells(){
   
   for (let y = 0; y < rowLength; y++) {
     for (let x = 0; x < rowWidth; x++) {
     const element = cellsList[y][x];
 
     // print(element.cellX);
     // print(element.cellY);
     if (element.isBlack){
       fill(0);
     }
     else{
       fill(255);
     }
     square((element.cellX - 1)* boardSize/rowWidth, (element.cellY - 1)* boardSize/rowLength, boardSize/min(rowLength, rowWidth));
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
     for (let x = 0; x < rowWidth; x++) {
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
   if(mouseX> 0 && mouseY > 0 && mouseX < boardSize && mouseY < boardSize){
   // print(lookForCell(mouseX, mouseY));
   lookForCell(mouseX, mouseY).isBlack = !lookForCell(mouseX, mouseY).isBlack;

 
 }
 
 }
 function keyPressed(){
   gameOn = true;
 }
