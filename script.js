const gridContainer = document.querySelector(".grid-container");

let mouseDown = false;

document.addEventListener('mousedown', () => {
  mouseDown = true;
})

document.addEventListener('mouseup', () => {
  mouseDown = false;
})

function createGrid(size) {
  gridContainer.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-item");
    gridContainer.appendChild(square);
  }
}


let paintColor = "black";

function paintSquare(e) {
  if (mouseDown) {
    e.target.style.backgroundColor = "black";
  }
}

createGrid(50);



const squares = document.querySelectorAll(".grid-item");
squares.forEach((square) => {
  square.addEventListener('mouseover', paintSquare);
});