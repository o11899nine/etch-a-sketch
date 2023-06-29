const backgroundColorPicker = document.getElementById("background-color-picker");
const pencilBtn = document.querySelector(".pencil-btn");
const pencilSlider = document.querySelector(".pencil-slider");
const pencilSliderValueDiv = document.querySelector(".pencil-slider-value")
const clearBtn = document.querySelector(".clear-btn");
const eraserBtn = document.querySelector(".eraser-btn");
const gridContainer = document.querySelector(".grid-container");
const paintColorPicker = document.getElementById("paint-color-picker");
const randomColorBtn = document.querySelector(".random-color-btn");
const recolorColorPicker = document.getElementById("recolor-color-picker");

const allSquares = () => document.querySelectorAll(".square");

backgroundColorPicker.addEventListener("input", changeBackgroundColor);
pencilBtn.addEventListener("click", () => {
  gridContainer.style.cursor = "url('img/pencil_cursor.cur'), auto";
  currentPaintColor = paintColorPicker.value;
  randomColor = false;
  deselectRecolor();
});
pencilSlider.addEventListener("input", setPencilSize);
clearBtn.addEventListener("click", clearCanvas);
eraserBtn.addEventListener("click", activateEraser);
paintColorPicker.addEventListener("input", changePaintColor);
randomColorBtn.addEventListener("click", () => {
  randomColor = true;
  deselectRecolor();
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
  const [, r, g, b] = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return `#` +
    `${parseInt(r, 10).toString(16).padStart(2, '0')}` +
    `${parseInt(g, 10).toString(16).padStart(2, '0')}` +
    `${ parseInt(b, 10).toString(16).padStart(2, '0')}`;
}

function getRandomHexColor() {
  const hexColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${hexColor}`;
}


// Main functions

function deselectRecolor() {
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
  deselectRecolor();
  currentPaintColor = paintColorPicker.value;
  gridContainer.style.cursor = "url('img/pencil_cursor.cur'), auto";
}

function recolorSquares() {
  const clickedSquareColor = rgbToHex(this.style.backgroundColor);
  allSquares().forEach((square) => {
    const squareColor = rgbToHex(square.style.backgroundColor);
    if (squareColor === clickedSquareColor && squareColor !== currentBGColor) {
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
  gridContainer.style.cursor = "url('img/pencil_cursor.cur'), auto";
}

function activateEraser() {
  randomColor = false;
  currentPaintColor = currentBGColor;
  gridContainer.style.cursor = "url('img/eraser_cursor.cur'), auto";
  deselectRecolor();
}

function changePaintColor() {
  randomColor = false;
  currentPaintColor = this.value;
  gridContainer.style.cursor = "url('img/pencil_cursor.cur'), auto";
  deselectRecolor();
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
  currentPaintColor = paintColorPicker.value;
  deselectRecolor();
}

function paintSquare(event) {
  if (randomColor) {
    currentPaintColor = getRandomHexColor();
    gridContainer.style.cursor = "url('img/rainbow_cursor.cur'), auto";
  }
  if (event.type === "mouseover") {
    if (mouseDown) {
      this.style.backgroundColor = currentPaintColor;
    }
  } else {
    this.style.backgroundColor = currentPaintColor;
  }

}

function createGrid(pencilSize) {
  currentPaintColor = paintColorPicker.value;
  gridContainer.innerHTML = "";
  const gridSize = 101 - pencilSize;
  pencilSliderValueDiv.innerHTML = `<p>Pencil size: ${Math.floor(pencilSize / 10) + 1}</p>`;
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

function setPencilSize() {
  if (1 <= pencilSlider.value <= 91) {
    createGrid(pencilSlider.value)
  } else {
    createGrid(71);
  }
}

setPencilSize();
