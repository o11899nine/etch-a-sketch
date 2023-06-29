const bgColorPicker = document.getElementById("background-color-picker");
const canvas = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clear-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const paintColorPicker = document.getElementById("paint-color-picker");
const pencilBtn = document.querySelector(".pencil-btn");
const pencilSlider = document.querySelector(".pencil-slider");
const pencilSliderValueDiv = document.querySelector(".pencil-slider-value")
const randomColorBtn = document.querySelector(".random-color-btn");
const recolorColorPicker = document.getElementById("recolor-color-picker");

const allSquares = () => document.querySelectorAll(".square");


bgColorPicker.addEventListener("input", changeBackgroundColor);
pencilBtn.addEventListener("click", setMode);
pencilSlider.addEventListener("input", setPencilSize);
clearBtn.addEventListener("click", clearCanvas);
eraserBtn.addEventListener("click", setMode);
paintColorPicker.addEventListener("input", changePaintColor);
randomColorBtn.addEventListener("click", setMode);
recolorColorPicker.addEventListener("input", setMode);

let currentBGColor = bgColorPicker.value;
let currPaintColor = paintColorPicker.value;
let mouseDown = false;
let randomColor = false;

document.addEventListener("mousedown", () => { mouseDown = true });
document.addEventListener("mouseup", () => { mouseDown = false });

// Helper functions
function rgbToHex(rgb) {
  const [, r, g, b] = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return `#` +
    `${parseInt(r, 10).toString(16).padStart(2, '0')}` +
    `${parseInt(g, 10).toString(16).padStart(2, '0')}` +
    `${parseInt(b, 10).toString(16).padStart(2, '0')}`;
}

function getRandomHexColor() {
  const hexColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hexColor}`;
}


// Main functions

function SwitchSquaresEventListeners(mode) {
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

function setMode() {
  const mode = this.dataset.mode;
  SwitchSquaresEventListeners(mode);
  canvas.style.cursor = `url("cursors/${mode}_cursor.cur"), auto`;
}



function clearCanvas() {
  allSquares().forEach((square) => {
    square.style.backgroundColor = currentBGColor;
  });
  setMode();
  currPaintColor = paintColorPicker.value;
}

function recolorSquares() {
  const clickedSquareColor = rgbToHex(this.style.backgroundColor);
  allSquares().forEach((square) => {
    const squareColor = rgbToHex(square.style.backgroundColor);
    if (squareColor === clickedSquareColor && squareColor !== currentBGColor) {
      square.style.backgroundColor = currPaintColor;
    }
  });
}

function activateRecolor() {

  currPaintColor = this.value;

}

function activateEraser() {
  randomColor = false;
  currPaintColor = currentBGColor;
  setMode();
}

function changePaintColor() {
  randomColor = false;
  currPaintColor = this.value;
  setMode();
}

function changeBackgroundColor() {
  const newBGColor = this.value;

  allSquares().forEach((square) => {
    const squareColor = rgbToHex(square.style.backgroundColor);
    console.log(squareColor);
    if (squareColor === currentBGColor) {
      square.style.backgroundColor = newBGColor;
    }
  });

  currentBGColor = newBGColor;
  currPaintColor = paintColorPicker.value;
  setMode();
}

function paintSquare(event) {
  if (randomColor) {
    currPaintColor = getRandomHexColor();
  }
  if (event.type === "mouseover") {
    if (mouseDown) {
      this.style.backgroundColor = currPaintColor;
    }
  } else {
    this.style.backgroundColor = currPaintColor;
  }

}

function createGrid(pencilSize) {
  currPaintColor = paintColorPicker.value;
  canvas.innerHTML = "";
  const gridSize = 101 - pencilSize;
  pencilSliderValueDiv.innerHTML = `<p>Pencil size: ${Math.floor(pencilSize / 10) + 1}</p>`;
  canvas.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = currentBGColor;
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

setPencilSize();
