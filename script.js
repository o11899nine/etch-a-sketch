const backgroundColorPicker = document.querySelector(".background-color-picker");
const clearBtn = document.querySelector(".clear-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const gridContainer = document.querySelector(".grid-container");
const paintColorPicker = document.querySelector(".paint-color-picker");
const randomColorBtn = document.querySelector(".random-color-btn");
const slider = document.querySelector(".slider");
const sliderValueDiv = document.querySelector(".slider-value")

const allSquares = () => document.querySelectorAll(".square");

backgroundColorPicker.addEventListener("input", changeBackgroundColor);
clearBtn.addEventListener("click", clearCanvas);
eraserBtn.addEventListener("click", activateEraser);
paintColorPicker.addEventListener("input", changePaintColor);
randomColorBtn.addEventListener("click", () => { randomColor = true });
slider.addEventListener("input", resizeGrid);

let currentBGColor = backgroundColorPicker.value;
let currentPaintColor = paintColorPicker.value;
let mouseDown = false;
let randomColor = false;

document.addEventListener("mousedown", () => { mouseDown = true });
document.addEventListener("mouseup", () => { mouseDown = false });

// Helper functions
function rgbToHex(rgb) {
  return `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map
    (n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;
}

function getRandomHexColor() {
  const hexColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hexColor}`;
}


// Main functions
function clearCanvas() {
  allSquares().forEach((square) => {
      square.style.backgroundColor = currentBGColor;
  });
}

function activateEraser() {
  randomColor = false;
  currentPaintColor = currentBGColor;
}

function changePaintColor() {
  randomColor = false;
  currentPaintColor = this.value;
}

function changeBackgroundColor() {
  const newBGColor = this.value;

  allSquares().forEach((square) => {
    const squareBGColor = rgbToHex(square.style.backgroundColor);
    if (squareBGColor === currentBGColor) {
      square.style.backgroundColor = newBGColor;
    }
  });
  
  currentBGColor = newBGColor;
}

function paintSquare(event) {
  if (randomColor) { currentPaintColor = getRandomHexColor(); }
  if (event.type === "mouseover") {
    if (mouseDown) {
      this.style.backgroundColor = currentPaintColor;
    }
  } else {
    this.style.backgroundColor = currentPaintColor;
  }

}

function createGrid(size) {
  sliderValueDiv.textContent = `${size} x ${size}`;
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplate =`repeat(${size}, 1fr) / repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = currentBGColor;
    square.addEventListener("click", paintSquare);
    square.addEventListener("mouseover", paintSquare);
    gridContainer.appendChild(square);
  }

  
}

function resizeGrid() { createGrid(this.value) }

createGrid(32);
