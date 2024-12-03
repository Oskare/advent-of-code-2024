export const partA = (input: string): string => {
  return [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)]
    .map((match) => Number(match[1]) * Number(match[2]))
    .reduce((sum, curr) => sum + curr)
    .toString();
}

export const partB = (input: string): string => {
  let enabled = true;

  return [...input.matchAll(/(do\(\))|(don\'t\(\))|mul\((\d{1,3}),(\d{1,3})\)/g)]
    .map((match) => {
      if (match[0] === 'don\'t()')
        enabled = false;
      else if (match[0] === 'do()')
        enabled = true;
      else if (enabled)
        return Number(match[3]) * Number(match[4]);
      return 0;
    })
    .reduce((sum, curr) => sum + curr)
    .toString();
}