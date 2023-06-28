const backgroundColorPicker = document.querySelector(".background-color-picker");
const brushBtn = document.querySelector(".brush-btn");
const brushSlider = document.querySelector(".brush-slider");
const brushSliderValueDiv = document.querySelector(".brush-slider-value")
const clearBtn = document.querySelector(".clear-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const gridContainer = document.querySelector(".grid-container");
const paintColorPicker = document.querySelector(".paint-color-picker");
const randomColorBtn = document.querySelector(".random-color-btn");

const allSquares = () => document.querySelectorAll(".square");

backgroundColorPicker.addEventListener("input", changeBackgroundColor);
brushBtn.addEventListener("click", () => { currentPaintColor = paintColorPicker.value });
brushSlider.addEventListener("input", setBrushSize);
clearBtn.addEventListener("click", clearCanvas);
eraserBtn.addEventListener("click", activateEraser);
paintColorPicker.addEventListener("input", changePaintColor);
randomColorBtn.addEventListener("click", () => { randomColor = true });

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
  currentPaintColor = paintColorPicker.value;
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
  currentPaintColor = paintColorPicker.value;
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

function createGrid(brushSize) {
  currentPaintColor = paintColorPicker.value;
  gridContainer.innerHTML = "";
  const gridSize = 101 - brushSize;
  brushSliderValueDiv.textContent = `Brush size: ${Math.floor(brushSize / 10) + 1}`;
  gridContainer.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = currentBGColor;
    square.addEventListener("click", paintSquare);
    square.addEventListener("mouseover", paintSquare);
    gridContainer.appendChild(square);
  }

  
}

function setBrushSize() { createGrid(this.value) }

createGrid(brushSlider.value);
