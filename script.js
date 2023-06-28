const gridContainer = document.querySelector(".grid-container");
const randomColorBtn = document.querySelector(".random-color-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const paintColorPicker = document.querySelector(".paint-color-picker");
const backgroundColorPicker = document.querySelector(".background-color-picker");

let currentBGColor = backgroundColorPicker.value;
let currentPaintColor = paintColorPicker.value;

function rgbToHex(rgb) {
  return `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;
}

paintColorPicker.addEventListener("input", () => {
  randomColor = false;
  currentPaintColor = paintColorPicker.value;
});

backgroundColorPicker.addEventListener("input", changeBackgroundColor);

function changeBackgroundColor() {
  const newBGColor = this.value;
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    const squareBGColor = rgbToHex(square.style.backgroundColor);
    if (squareBGColor === currentBGColor) {
      square.style.backgroundColor = newBGColor;
    }
  });
}



let mouseDown = false;
document.addEventListener("mousedown", () => { mouseDown = true });
document.addEventListener("mouseup", () => { mouseDown = false });


let randomColor = false;
randomColorBtn.addEventListener("click", () => { randomColor = true });

eraserBtn.addEventListener("click", activateEraser);


function activateEraser() {
  currentPaintColor = currentBGColor;
  randomColor = false;
}


function getRandomColor() {
  const hexColorValue = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hexColorValue}`;
}



function paintSquare(event) {
  if (randomColor) { currentPaintColor = getRandomColor(); }
  if (event.type === "mouseover") {
    if (mouseDown) {
      this.style.backgroundColor = currentPaintColor;
    }
  } else {
    this.style.backgroundColor = currentPaintColor;
  }

}

function createGrid(size) {
  gridContainer.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = currentBGColor;
    square.addEventListener("click", paintSquare);
    square.addEventListener("mouseover", paintSquare);
    gridContainer.appendChild(square);
  }
}





createGrid(16);
