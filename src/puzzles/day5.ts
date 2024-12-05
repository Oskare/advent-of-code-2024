export const partA = (input: string): string => {
  const [rules, updates] = input.split("\n\n").map(p => p.split("\n"));
  const ruleList: number[][] = rules.map(rule => rule.split("\|").map(Number));
  const updateList: number[][] = updates.map(update => update.split(",").map(Number));

  return updateList
    .map(update => isValidUpdate(ruleList, update) ? update[Math.floor(update.length / 2)] : 0)
    .reduce((sum, curr) => sum + curr)
    .toString();
}

const isValidUpdate = (rules: number[][], update: number[]): boolean => {
  return update.every((page, i) => {
    return update.slice(i + 1).every(trailingPage => ruleExists(page, trailingPage, rules));
  });
}

const ruleExists = (first: number, last: number, rules: number[][]) => {
  return rules.some(rule => rule[0] === first && rule[1] === last);
}

export const partB = (input: string): string => {
  const [rules, updates] = input.split("\n\n").map(p => p.split("\n"));
  const ruleList: number[][] = rules.map(rule => rule.split("\|").map(Number));
  const updateList: number[][] = updates.map(update => update.split(",").map(Number));

  return updateList
    .filter(update => !isValidUpdate(ruleList, update))
    .map(update => fixOrder(ruleList, update))
    .map(update => isValidUpdate(ruleList, update) ? update[Math.floor(update.length / 2)] : 0)
    .reduce((sum, curr) => sum + curr)
    .toString();
}

const fixOrder = (rules: number[][], update: number[]): number[] => {
  const fixedUpdate: number[] = [];

  for (let i = 0; i < update.length - 1; i++) {
    let page = update[i];
    let trailingPages = update.slice(i+1);
    for (let j = 0; j < trailingPages.length; j++) {
      // While no valid rule exist
      while (rules.filter(rule => rule[0] === page && rule[1] === trailingPages[j]).length === 0) {
        const failingRule = rules.filter(rule => rule[0] == trailingPages[j] && rule[1] == page)[0];

        // Swap place of the pages breaking the rule
        const switch1 = update.indexOf(failingRule[0]);
        const switch2 = update.indexOf(failingRule[1]);
        [update[switch1], update[switch2]] = [update[switch2], update[switch1]];
        page = update[i];
        trailingPages = update.slice(i + 1);
      }
    }
    fixedUpdate.push(page);
  }

  return fixedUpdate;
}