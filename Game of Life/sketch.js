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
  isAlive: false, 
  isSurviving: false
}

let cellsList = [];
let rowLength = 5 ;
let boardSize;
function setup() {
  boardSize = min(windowWidth, windowHeight);
  canvas = createCanvas(boardSize, boardSize);
  canvas.center("horizontal")
  for (let y = 0; y < rowLength; y++) {
    for (let x = 0; x < rowLength; x++) {

      let newCell = {...cell};

      newCell.cellX = x + 1;
      newCell.cellY = y + 1;

      cellsList.push(newCell);
      print(cellsList[x]);
    }
  }
  print(cellsList.length);

  strokeWeight(2);
}
function draw() {
  background(220);
  drawCells();
  if (millis() - lastTime > 2000){
  if (gameOn){
  judicator();
  live();
  lastTime = millis() + 2000;
  }
  }
  // square(boardSize/2, boardSize/2, boardSize/5);
}

/**
 * draws all cells inside of the cellsList variable.
 */
function drawCells(){
  
  for (let i = 0; i < cellsList.length; i++) {
    const element = cellsList[i];

    // print(element.cellX);
    // print(element.cellY);
    if (element.isAlive){
      fill(255, 0, 0);
    }
    else{
      fill(255);
    }
    square((element.cellX - 1)* boardSize/rowLength, (element.cellY - 1)* boardSize/rowLength, boardSize/rowLength);
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
  for (let i = 0; i < cellsList.length; i++) {
    const element = cellsList[i];
    // print(floor(placeX * 5 / boardSize) + 1 === element.cellX && floor(placeY * 5 / boardSize) + 1 === element.cellY);
    if (floor(placeX * rowLength / boardSize) + 1 === element.cellX && floor(placeY * rowLength / boardSize) + 1 === element.cellY){
      
      return element;
    }

  }
}

/**
 * Triggered when mouse is Clicked. 
 */
function mouseClicked(){
  if(mouseX> 0 && mouseY > 0 && mouseX < boardSize && mouseY < boardSize){
  print(lookForCell(mouseX, mouseY));
  lookForCell(mouseX, mouseY).isAlive = true;
  lookForCell(mouseX, mouseY).isSurviving = true;

}

}
function keyPressed(){
  gameOn = true;
}
/**
 * (as in the verb for life)
 * 
 * conway's classic concept
 */
function live(){

  for (let i = 0; i < cellsList.length; i++) {
    const element = cellsList[i];

    let aliveCount = 0;

      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
          if (lookForCell(mouseX + x, mouseY + y) !== undefined){
            print("found a cell")
            print(lookForCell(mouseX + (x * boardSize/5), mouseY + (y * boardSize/5)).isAlive);
          if (lookForCell(mouseX + (x * boardSize/5), mouseY + (y * boardSize/5)).isAlive && !(x=== 0 && y === 0)){
            aliveCount++;
          }
        }
        }
      }
        print(aliveCount);
        if (element.isAlive){
          if (aliveCount > 3 || aliveCount < 2){
            element.isSurviving = false;
          }
        }
      else{
        if (aliveCount === 3){
          element.isSurviving = true;
        }
      }
    
      
  }
}

/**
 * The Judge and Jury. 
 * 
 * Sorry, I don't make the rules. (yes I do)
 * @rules Alive and 3 or more neighbors / Alive and less than two neighbors = death, Dead and 3 neighbors = life.
 */

function judicator(){
  for (let i = 0; i < cellsList.length; i++) {
    const element = cellsList[i];

    if (element.isSurviving){
      element.isAlive = true;
    }
    if (!element.isSurviving){
      element.isAlive = false;
    }

  }
}