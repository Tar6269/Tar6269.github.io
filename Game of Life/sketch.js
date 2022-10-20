// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let cell = {
  cellX: 0,
  cellY: 0,
  isAlive: false, 

}
let cellsList = [];
 
let boardSize;
function setup() {
  boardSize = min(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);

  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {

      let newCell = {...cell};

      newCell.cellX = x* boardSize/5;
      newCell.cellY = y* boardSize/5;
      newCell.isAlive = false;

      cellsList.push(newCell);
      print(cellsList[x]);
    }
  }
  print(cellsList.length);
}
function draw() {
  background(220);
  drawCells();
  // square(boardSize/2, boardSize/2, boardSize/5);
}

function drawCells(){
  for (let i = 0; i < cellsList.length; i++) {
    const element = cellsList[i];

    // print(element.cellX);
    // print(element.cellY);

    square(element.cellX, element.cellY, boardSize/5);
  }
}

function lookForCell(placeX, placeY){
  for (let i = 0; i < cellsList.length-1; i++) {
    const element = cellsList[i];
    print(placeX > element.cellX && placeX < cellsList[i + 1].cellX && placeY > element.cellY && placeY < cellsList[i + 1].cellY)
    if (placeX > element.cellX && placeX < cellsList[i + 1].cellX && placeY > element.cellY && placeY < cellsList[i + 1].cellY){
      return element;
    }

  }
}

function mouseClicked(){

  print(lookForCell(mouseX, mouseY));

}