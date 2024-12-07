export const partA = (input: string): string => {
  return getCalibrations(input)
    .map(calibration => runTest(calibration, 2) ? calibration.result : 0)
    .reduce((sum, curr) => sum + curr)
    .toString();
}

type Calibration = {
  result: number;
  equation: string[];
}

const getCalibrations = (input: string) => {
  return input.split("\n").map(l => {
    const parts = l.split(": ");
    return { result: Number(parts[0]), equation: parts[1].split(" ") };
  });
}

const calculate = (calibration: Calibration, operators: string[]) => {
  let sum = Number(calibration.equation[0]);
  for (let i = 1; i < calibration.equation.length; i++) {
    let op = operators.pop();
    if (op === '*')
      sum *= Number(calibration.equation[i])
    else if (op === '||')
      sum = Number(sum.toString() + calibration.equation[i]);
    else // +
      sum += Number(calibration.equation[i])
  }
  return calibration.result === sum;
}

const runTest = (calibration: Calibration, operatorTypesCount: number): boolean => {
  const operatorCount = calibration.equation.length - 1;
  const permutations = Math.pow(operatorTypesCount, operatorCount);
  const operatorPermutations = []

  for (let i = 0; i < permutations; i++) {
    const binary = i.toString(operatorTypesCount).padStart(operatorCount, "0");
    operatorPermutations.push(binary.split("").map(i => i === "1" ? '*' : i === "2" ? '||' : '+'));
  }
  return operatorPermutations.some(operators => calculate(calibration, operators));
}

export const partB = (input: string): string => {
  return getCalibrations(input)
    .map(calibration => runTest(calibration, 3) ? calibration.result : 0)
    .reduce((sum, curr) => sum + curr)
    .toString();
}