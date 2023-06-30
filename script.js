const bgColorPicker = document.getElementById("bg-color-picker");
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

let bgColor = bgColorPicker.value;
let mode = "draw";
let mouseIsDown = false;
let paintColor = paintColorPicker.value;
let randomPaintColor = false;

bgColorPicker.addEventListener("input", changeBackgroundColor);
clearBtn.addEventListener("click", clearCanvas);
eraserBtn.addEventListener("click", setMode);
paintColorPicker.addEventListener("input", setMode);
pencilBtn.addEventListener("click", setMode);
pencilSlider.addEventListener("input", setPencilSize);
randomColorBtn.addEventListener("click", setMode);
recolorBtn.addEventListener("click", setMode);

/* To avoid accidental drawing by hovering, the mousedown state is checked */
/* This state is checked in the paintSquare() function */
canvas.addEventListener("mousedown", () => { mouseIsDown = true });
canvas.addEventListener("mouseup", () => { mouseIsDown = false });

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

function setCursor() {
  canvas.style.cursor = `url("cursors/${mode}.cur"), auto`
}

function setModeEventListeners() {
  if (["draw", "erase", "random"].includes(mode)) {
    allSquares().forEach((square) => {
      square.removeEventListener("click", recolorSquares);
      square.addEventListener("click", paintSquare);
      square.addEventListener("mouseover", paintSquare);
    });
  } else if (["recolor"].includes(mode)) {
    allSquares().forEach((square) => {
      square.addEventListener("click", recolorSquares);
      square.removeEventListener("click", paintSquare);
      square.removeEventListener("mouseover", paintSquare);
    });
  }
}

function setPaintColor() {
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
  else if (mode !== "erase") {
    paintColor = paintColorPicker.value;
  }
}

function setMode() {
  if (this.dataset.mode) {
    mode = this.dataset.mode;
    setModeEventListeners();
    setCursor();
  }
  setPaintColor();
}

function clearCanvas() {
  allSquares().forEach((square) => { square.style.backgroundColor = bgColor; });
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
  setPaintColor();
}

function paintSquare(event) {
  if (randomPaintColor) {paintColor = getRandomHexColor()}
  
  if (event.type === "click" || event.type === "mouseover" && mouseIsDown) {
    this.style.backgroundColor = paintColor;
  }
}

function createGrid(pencilSize) {
  canvas.innerHTML = "";
  const gridSize = 101 - pencilSize;

  canvas.style.gridTemplate =
    `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    square.style.backgroundColor = bgColor;
    square.classList.add("square");
    canvas.appendChild(square);
  }

  setModeEventListeners(mode);


}

function setPencilSize() {
  let pencilSize = pencilSlider.value;
  pencilSliderValueDiv.innerHTML =
    `<p>Pencil size: ${Math.floor(pencilSize / 10) + 1}</p>`;
  
  if (91 < pencilSize < 1) { pencilSize = 41 };
  createGrid(pencilSize);
}

setPencilSize();
setCursor();