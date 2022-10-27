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
let rowLength = 5;
let rowWidth = 5;
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
function draw() {
  background(220);
  drawCells();
  if (millis() - lastTime > 2000){
  if (gameOn){
  live();
  judicator();

  lastTime = millis() + 2000;
  }
  }
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
    if (element.isAlive){
      fill(255, 0, 0);
    }
    else{
      fill(255);
    }
    square((element.cellX - 1)* boardSize/rowLength, (element.cellY - 1)* boardSize/rowLength, boardSize/rowLength);
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
    if (floor(placeX * rowWidth / boardSize) + 1 === element.cellX && floor(placeY * rowLength / boardSize) + 1 === element.cellY){
      
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

  for (let y = 0; y < rowLength; y++) {
    for (let x = 0; x < rowWidth; x++) {
    const element = cellsList[y][x];

    let aliveCount = 0;

      for (let yOffset = -1; yOffset < 2; yOffset++) {
        // print("test2")
        for (let xOffset = -1; xOffset < 2; xOffset++) {
          // print("test");
           
          if (x + xOffset > -1 && y + yOffset > -1 && x + xOffset < rowWidth && y + yOffset < rowLength && !(xOffset === 0 && yOffset === 0)){
            // && cellsList[y + yOffset][x + xOffset]!== undefined

            let testy = (y+ xOffset);
            let testx = (x+ xOffset);

            // print(cellsList);

            print(y+ xOffset);

            print(x + xOffset);
            print(testy);
            print(testx);
            print("test");
            print(cellsList[0][0]);
            print(cellsList[testy]);

            print(cellsList[testy][testx]);
            print("found a cell")
            // print(lookForCell(element.cellX + (x * boardSize/rowLength), element.cellY + (y * boardSize/rowLength)));
            if (lookForCell(cellsList[y + yOffset][x + xOffset].cellX, cellsList[y + yOffset][x + xOffset].cellY).isAlive && !(xOffset === 0 && yOffset === 0)){
              print("true was returned");
            }
          if (lookForCell(cellsList[y + yOffset][x + xOffset].cellX, cellsList[y + yOffset][x + xOffset].cellY.isAlive && !(xOffset === 0 && yOffset === 0))){
            aliveCount++;
          }
        
        }
      }
    }   

       
        if (element.isAlive){
          print(aliveCount);
          if (aliveCount > 3 || aliveCount < 2){
            element.isSurviving = false;
          }
        }
      else if (aliveCount === 3){
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
  for (let y = 0; y < rowLength; y++) {
    for (let x = 0; x < rowWidth; x++) {
      
      const element = cellsList[y][x];

      if (element.isSurviving){
        element.isAlive = true;
      }
      else if (!element.isSurviving){
        element.isAlive = false;
      }

  }
}
}