const gridContainer = document.querySelector(".grid-container");

function createGrid(size) {
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-item");
    gridContainer.appendChild(square);
  }


}

createGrid(50);