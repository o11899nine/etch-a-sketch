const grid = document.querySelector(".grid");
const gridWidth = grid.offsetWidth;

function createGrid(size) {
  const squareSize = (gridWidth / size); 
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    grid.appendChild(row);
    for (let j = 0; j < size; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.height = `${squareSize}px`;
      square.style.width = `${squareSize}px`;
      row.appendChild(square);
    }
  }
  
  
}

createGrid(5);