const bgColorPicker = document.getElementById("background-color-picker");
const canvas = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clear-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const paintColorPicker = document.getElementById("paint-color-picker");
const pencilBtn = document.querySelector(".pencil-btn");
const pencilSlider = document.querySelector(".pencil-slider");
const pencilSliderValueDiv = document.querySelector(".pencil-slider-value")
const randomColorBtn = document.querySelector(".random-color-btn");
const recolorBtn = document.querySelector(".recolor-btn");

const allSquares = () => document.querySelectorAll(".square");



bgColorPicker.addEventListener("input", changeBackgroundColor);
pencilSlider.addEventListener("input", setPencilSize);
pencilBtn.addEventListener("click", setMode);
clearBtn.addEventListener("click", clearCanvas);
eraserBtn.addEventListener("click", setMode);
paintColorPicker.addEventListener("input", setMode);
randomColorBtn.addEventListener("click", setMode);
recolorBtn.addEventListener("click", setMode);

let mode = "draw";
let bgColor = bgColorPicker.value;
let paintColor = paintColorPicker.value;
let mouseDown = false;
let randomPaintColor = false;

document.addEventListener("mousedown", () => { mouseDown = true });
document.addEventListener("mouseup", () => { mouseDown = false });

// Helper functions
function rgbToHex(rgb) {
  const [, r, g, b] = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return `#` +
    `${parseInt(r, 10).toString(16).padStart(2, '0')}` +
    `${parseInt(g, 10).toString(16).padStart(2, '0')}` +
    `${parseInt(b, 10).toString(16).padStart(2, '0')}`;
};

function getRandomHexColor() {
  const hexColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hexColor}`;
}


// Main functions
function setCursor(mode) {canvas.style.cursor = `url("cursors/${mode}.cur"), auto`}

function setModeEventListeners(mode) {
  if (["draw", "erase", "random"].includes(mode)) {
    allSquares().forEach((square) => {
      square.removeEventListener("click", recolorSquares);
      square.addEventListener("click", paintSquare);
      square.addEventListener("mouseover", paintSquare);
    });
  } else if (mode === "recolor") {
    allSquares().forEach((square) => {
      square.addEventListener("click", recolorSquares);
      square.removeEventListener("click", paintSquare);
      square.removeEventListener("mouseover", paintSquare);
    });
  }
}

function setPaintColor(mode) {
  if (mode === "draw" || mode === "recolor") {
    paintColor = paintColorPicker.value;
    randomPaintColor = false;
  }
  else if (mode === "erase") {
    paintColor = bgColor;
    randomPaintColor = false;
  }
  else if (mode === "random") {
    paintColor = paintColorPicker.value;
    randomPaintColor = true;
  }
}

function setMode() {
  mode = this.dataset.mode;
  setModeEventListeners(mode);
  setCursor(mode);
  setPaintColor(mode);
}



function clearCanvas() {
  allSquares().forEach((square) => {square.style.backgroundColor = bgColor;});
}

function recolorSquares() {
  const clickedSquareColor = rgbToHex(this.style.backgroundColor);
  allSquares().forEach((square) => {
    const squareColor = rgbToHex(square.style.backgroundColor);
    if (squareColor === clickedSquareColor && squareColor !== bgColor) {
      square.style.backgroundColor = paintColor;
    }
  });
}

function changeBackgroundColor() {
  const newBGColor = this.value;

  allSquares().forEach((square) => {
    const squareColor = rgbToHex(square.style.backgroundColor);
    if (squareColor === bgColor) {
      square.style.backgroundColor = newBGColor;
    }
  });

  bgColor = newBGColor;
  if (mode === "erase") { paintColor = bgColor };
}

function paintSquare(event) {
  if (randomPaintColor) {
    paintColor = getRandomHexColor();
  }
  if (event.type === "mouseover") {
    if (mouseDown) {
      this.style.backgroundColor = paintColor;
    }
  } else {
    this.style.backgroundColor = paintColor;
  }

}

function createGrid(pencilSize) {
  canvas.innerHTML = "";
  const gridSize = 101 - pencilSize;
  pencilSliderValueDiv.innerHTML = `<p>Pencil size: ${Math.floor(pencilSize / 10) + 1}</p>`;
  canvas.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = bgColor;
    square.addEventListener("click", paintSquare);
    square.addEventListener("mouseover", paintSquare);
    canvas.appendChild(square);
  }


}

function setPencilSize() {
  if (1 <= pencilSlider.value <= 91) {
    createGrid(pencilSlider.value)
  } else {
    createGrid(71);
  }
}

createGrid(71);
