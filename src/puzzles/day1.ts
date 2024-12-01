export const partA = (input: string): string => {
  const leftList = input.split("\n").map(l => l.split("   ")[0]).map(Number).sort();
  const rightList = input.split("\n").map(l => l.split("   ")[1]).map(Number).sort();
  const difference = leftList.map((id, index) => Math.abs(id - rightList[index]))
    .reduce((sum, curr) => sum + curr);
  return difference.toString();
}

export const partB = (input: string): string => {
  const leftList = input.split("\n").map(l => l.split(" ")[0]).map(Number).sort();
  const rightList = input.split("\n").map(l => l.split("   ")[1]).map(Number).sort();
  const similarity = leftList
    .map((id, index) => id * (rightList.filter(id => id === leftList[index]).length))
    .reduce((sum, curr) => sum + curr)
  return similarity.toString();
}