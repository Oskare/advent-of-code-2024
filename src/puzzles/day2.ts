export const partA = (input: string): string => {
  return input.split("\n")
    .map(r => isSafe(r.split(" ").map(Number)))
    .reduce((sum, curr) => sum + curr)
    .toString();
}

export const partB = (input: string): string => {
  return input.split("\n")
    .map(report => {
      const parts = report.split(" ").map(Number);
      let safe = isSafe(parts);

      if (!safe) {
        for (let j = 0; j < parts.length; j++) {
          let test = parts.slice();
          test.splice(j, 1);
          if (isSafe(test)) {
            return 1;
          }
        }
      }

      return safe;
    })
    .reduce((sum, curr) => sum + curr)
    .toString();
}

const isSafe = (parts: number[]): number => {
  let increasing = true;
  let decreasing = true;
  let difference = true;

  for (let i = 0; i < parts.length - 1; i++) {
    decreasing &&= !(parts[i] < parts[i + 1]);
    increasing &&= !(parts[i] > parts[i + 1]);
    difference &&= !(Math.abs(parts[i] - parts[i + 1]) > 3 || Math.abs(parts[i] - parts[i + 1]) < 1)
  }

  return (increasing || decreasing) && difference ? 1 : 0;
}