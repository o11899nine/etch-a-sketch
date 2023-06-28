const gridContainer = document.querySelector(".grid-container");
const randomColorBtn = document.querySelector(".random-color-btn")

let mouseDown = false;
document.addEventListener('mousedown', () => {mouseDown = true});
document.addEventListener('mouseup', () => {mouseDown = false});

let randomColor = false;
randomColorBtn.addEventListener('click', () => {randomColor = true});

let selectedColor = "rgb(0,0,0)";


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
    if (randomColor) {
      e.target.style.backgroundColor = getRandomColor();
    } else {
      e.target.style.backgroundColor = selectedColor;
    }
  }
}

function createGrid(size) {
  gridContainer.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener('mouseover', paintSquare);
    gridContainer.appendChild(square);
  }
}





createGrid(50);