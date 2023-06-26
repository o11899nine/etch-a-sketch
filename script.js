const gridContainer = document.querySelector(".grid-container");

function createGrid(size) {
  gridContainer.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-item");
    gridContainer.appendChild(square);
  }
}

createGrid(32);