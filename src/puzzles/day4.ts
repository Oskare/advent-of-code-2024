export const partA = (input: string): string => {
  let grid = input.split("\n").map(line => line.split(""));

  let xCoords: number[][] = [];
  grid.forEach((row, r) => row.forEach((cell, c) => {
    if (cell === 'X')
      xCoords.push([r, c]);
  }));

  let count = 0;
  for (let [r, c] of xCoords) {
    if (cell(r, c + 1, grid) === "M" && cell(r, c + 2, grid) === "A" && cell(r, c + 3, grid) === "S") count++;
    if (cell(r, c - 1, grid) === "M" && cell(r, c - 2, grid) === "A" && cell(r, c - 3, grid) === "S") count++;
    if (cell(r + 1, c, grid) === "M" && cell(r + 2, c, grid) === "A" && cell(r + 3, c, grid) === "S") count++;
    if (cell(r - 1, c, grid) === "M" && cell(r - 2, c, grid) === "A" && cell(r - 3, c, grid) === "S") count++;
    if (cell(r + 1, c + 1, grid) === "M" && cell(r + 2, c + 2, grid) === "A" && cell(r + 3, c + 3, grid) === "S") count++;
    if (cell(r + 1, c - 1, grid) === "M" && cell(r + 2, c - 2, grid) === "A" && cell(r + 3, c - 3, grid) === "S") count++;
    if (cell(r - 1, c + 1, grid) === "M" && cell(r - 2, c + 2, grid) === "A" && cell(r - 3, c + 3, grid) === "S") count++;
    if (cell(r - 1, c - 1, grid) === "M" && cell(r - 2, c - 2, grid) === "A" && cell(r - 3, c - 3, grid) === "S") count++;
  }

  return count.toString();
}

function cell(x: number, y: number, grid: string[][]) {
  if (grid[x] && grid[x][y])
    return grid[x][y];
  return "";
}

export const partB = (input: string): string => {
  let grid = input.split("\n").map(line => line.split(""));

  let aCoords: number[][] = [];
  grid.forEach((row, r) => row.forEach((cell, c) => {
    if (cell === 'A')
      aCoords.push([r, c]);
  }));

  let count = 0;
  for (let [r, c] of aCoords) {
    count += (
      cell(r - 1, c - 1, grid) === "M" && cell(r - 1, c + 1, grid) === "M" &&
      cell(r + 1, c - 1, grid) === "S" && cell(r + 1, c + 1, grid) === "S")
    || (
      cell(r - 1, c - 1, grid) === "S" && cell(r - 1, c + 1, grid) === "S" &&
      cell(r + 1, c - 1, grid) === "M" && cell(r + 1, c + 1, grid) === "M")
    || (
      cell(r - 1, c - 1, grid) === "M" && cell(r - 1, c + 1, grid) === "S" &&
      cell(r + 1, c - 1, grid) === "M" && cell(r + 1, c + 1, grid) === "S")
    || (
      cell(r - 1, c - 1, grid) === "S" && cell(r - 1, c + 1, grid) === "M" &&
      cell(r + 1, c - 1, grid) === "S" && cell(r + 1, c + 1, grid) === "M")
      ? 1 : 0;
  }

  return count.toString();
}