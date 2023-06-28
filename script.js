const backgroundColorPicker = document.querySelector(".background-color-picker");
const brushBtn = document.querySelector(".brush-btn");
const brushSlider = document.querySelector(".brush-slider");
const brushSliderValueDiv = document.querySelector(".brush-slider-value")
const clearBtn = document.querySelector(".clear-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const gridContainer = document.querySelector(".grid-container");
const paintColorPicker = document.querySelector(".paint-color-picker");
const randomColorBtn = document.querySelector(".random-color-btn");
const recolorColorPicker = document.querySelector(".recolor-color-picker");

const allSquares = () => document.querySelectorAll(".square");

backgroundColorPicker.addEventListener("input", changeBackgroundColor);
brushBtn.addEventListener("click", () => {
  currentPaintColor = paintColorPicker.value;
  selectBrush();
});
brushSlider.addEventListener("input", setBrushSize);
clearBtn.addEventListener("click", clearCanvas);
eraserBtn.addEventListener("click", activateEraser);
paintColorPicker.addEventListener("input", changePaintColor);
randomColorBtn.addEventListener("click", () => {
  randomColor = true;
  selectBrush
});
recolorColorPicker.addEventListener("input", activateRecolor);

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

function selectBrush() {
  allSquares().forEach((square) => {
    square.removeEventListener("click", recolorSquares);
    square.addEventListener("click", paintSquare);
    square.addEventListener("mouseover", paintSquare);
  });
}



function clearCanvas() {
  allSquares().forEach((square) => {
    square.style.backgroundColor = currentBGColor;
  });
  selectBrush();
  currentPaintColor = paintColorPicker.value;
}

function recolorSquares() {
  const clickedSquareBGColor = rgbToHex(this.style.backgroundColor);
  allSquares().forEach((square) => {
    const squareBGColor = rgbToHex(square.style.backgroundColor);
    if (squareBGColor === clickedSquareBGColor && squareBGColor !== currentBGColor) {
      square.style.backgroundColor = currentPaintColor;
    }
  });
}

function activateRecolor() {

  currentPaintColor = this.value;
  allSquares().forEach((square) => {
    square.removeEventListener("click", paintSquare);
    square.removeEventListener("mouseover", paintSquare);
    square.addEventListener("click", recolorSquares);
  });
}

function activateEraser() {
  randomColor = false;
  currentPaintColor = currentBGColor;
  selectBrush();
}

function changePaintColor() {
  randomColor = false;
  currentPaintColor = this.value;
  selectBrush();
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
  currentPaintColor = paintColorPicker.value;
  selectBrush();
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
