const gridContainer = document.querySelector(".grid-container");
const randomColorBtn = document.querySelector(".random-color-btn")

let mouseDown = false;
let selectedColor = "rgb(0,0,0)";
let randomizer = false;

document.addEventListener('mousedown', () => {
  mouseDown = true;
});

document.addEventListener('mouseup', () => {
  mouseDown = false;
});

function randInt(number) {
  return Math.floor(Math.random() * number);
}

function randomColor() {
  return `rgb(${randInt(255)}, ${randInt(255)}, ${randInt(255)})`;
}

randomColorBtn.addEventListener('click', () => {
  randomizer = true;
});

function paintSquare(e) {
  if (mouseDown) {
    if (randomizer) {
      e.target.style.backgroundColor = randomColor();
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