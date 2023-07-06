const bgColorPicker = document.getElementById("bg-color-picker");
const canvas = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clear-btn");
const eraseBtn = document.querySelector(".erase-btn");
const gridCheckbox = document.querySelector(".grid-checkbox");
const paintColorPicker = document.getElementById("paint-color-picker");
const drawnBtn = document.querySelector(".draw-btn");
const pencilSlider = document.getElementById("pencil-size-slider");
const pencilSliderText = document.querySelector(".pencil-slider-text")
const randomBtn = document.querySelector(".random-btn");
const recolorBtn = document.querySelector(".recolor-btn");

const allSquares = () => document.querySelectorAll(".square");
const allToolBtns = () => document.querySelectorAll(".tool-btn");

let bgColor = bgColorPicker.value;
let mode = "draw";
let mouseIsDown = false;
let paintColor = paintColorPicker.value;
let randomPaintColor = false;

bgColorPicker.addEventListener("input", changeBackgroundColor);
clearBtn.addEventListener("click", clearCanvas);
eraseBtn.addEventListener("click", setMode);
gridCheckbox.addEventListener("click", toggleGrid);
paintColorPicker.addEventListener("input", setMode);
drawnBtn.addEventListener("click", setMode);
pencilSlider.addEventListener("input", setPencilSize);
randomBtn.addEventListener("click", setMode);
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
  canvas.style.cursor = `url("cursors/${mode}.png"), auto`
}

function setCanvasEventListeners() {
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

function toggleGrid() {
  canvas.classList.toggle("grid");
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

function toggleToolBtn() {
  allToolBtns().forEach((button) => {
    button.classList.remove("active");
  });
  const clickedBtn = document.querySelector(`.${mode}-btn`);
  clickedBtn.classList.toggle("active");
  
}

function setMode() {
  if (this.dataset.mode) {
    mode = this.dataset.mode;
    setCanvasEventListeners();
    setCursor();
    toggleToolBtn();
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
  if (mode === "erase") { setPaintColor() }
}

function paintSquare(event) {
  if (randomPaintColor) {paintColor = getRandomHexColor()}
  
  if (event.type === "click" || event.type === "mouseover" && mouseIsDown) {
    this.style.backgroundColor = paintColor;
  }
}

function createGrid(pencilSize) {
  const gridSize = 101 - pencilSize;

  canvas.innerHTML = "";
  canvas.style.gridTemplate =
    `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    square.style.backgroundColor = bgColor;
    square.classList.add("square");
    canvas.appendChild(square);
  }

  setCanvasEventListeners(mode);
}

function setPencilSize() {
  let pencilSize = pencilSlider.value;
  if (pencilSize < 1 || pencilSize > 91) { pencilSize = 41 };

  pencilSliderText.innerHTML =`Pen size: ${Math.floor(pencilSize / 10) + 1}`;
  
  createGrid(pencilSize);
}

setPencilSize();
setCursor();