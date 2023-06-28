const gridContainer = document.querySelector(".grid-container");
const randomColorBtn = document.querySelector(".random-color-btn")
const eraserBtn = document.querySelector(".eraser-btn")

let mouseDown = false;
document.addEventListener('mousedown', () => {mouseDown = true});
document.addEventListener('mouseup', () => {mouseDown = false});

let backgroundColor = "green";
let paintColor = "black";

let randomColor = false;
randomColorBtn.addEventListener('click', () => { randomColor = true });

eraserBtn.addEventListener('click', activateEraser);


function activateEraser() {
  paintColor = backgroundColor;
  randomColor = false;
}

function randIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor() {
  return `rgb(
    ${randIntBetween(0, 255)}, 
    ${randIntBetween(0, 255)}, 
    ${randIntBetween(0, 255)}
    )`;
  }
  


function paintSquare(e) {
  if (mouseDown) {
    if (randomColor) {paintColor = getRandomColor();} 
    e.target.style.backgroundColor = paintColor;
  }
}

function createGrid(size) {
  gridContainer.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = backgroundColor;
    square.addEventListener('mouseover', paintSquare);
    gridContainer.appendChild(square);
  }
}





createGrid(50);