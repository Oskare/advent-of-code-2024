import {isNumberObject} from "node:util/types";

export const partA = (input: string): string => {
  let [rules, updates] = input.split("\n\n");

  let ruleList: number[][] = [];
  for (let rule of rules.split("\n")) {
    ruleList.push(rule.split("\|").map(Number));
  }
  let ruleMap: Map<number, Rule> = new Map();
  for (let rule of rules) {
  }
  // console.log(ruleList);

  let updateList: number[][] = [];
  for (let update of updates.split("\n")) {
    updateList.push(update.split(",").map(Number));
  }
  // console.log(updateList)

  let sum: number = 0;
  for (let update of updateList) {
    if (isValidUpdate(ruleList, update))
      sum += update[Math.floor(update.length/2)];
  }

  return sum.toString();
}

const isValidUpdate = (rules: number[][], update: number[]): boolean => {
  let valid = true;
  for (let i = 0; i < update.length - 1; i++) {
    let page = update[i];
    let trailingPages = update.slice(i+1);
    valid &&= trailingPages.every(trailingPage => ruleExists(page, trailingPage, rules));
  }
  return valid;
}

const ruleExists = (first: number, last: number, rules: number[][]) => {
  return rules.some(rule => rule[0] === first && rule[1] === last);
}

type Rule = {
  first: number;
  last: number
}

export const partB = (input: string): string => {
  let [rules, updates] = input.split("\n\n");

  let ruleList: number[][] = [];
  for (let rule of rules.split("\n")) {
    ruleList.push(rule.split("\|").map(Number));
  }
  let ruleMap: Map<number, Rule> = new Map();
  for (let rule of rules) {
  }
  // console.log(ruleList);

  let updateList: number[][] = [];
  for (let update of updates.split("\n")) {
    updateList.push(update.split(",").map(Number));
  }
  // console.log(updateList)

  let sum: number = 0;
  for (let update of updateList) {
    if (!isValidUpdate(ruleList, update)) {
      //console.log('not valid', update);
      // fix order

      let fixedUpdate = fixOrder(ruleList, update);

      //console.log('fixed', fixedUpdate);
      sum += fixedUpdate[Math.floor(fixedUpdate.length/2)];
    }
  }

  return sum.toString();
}

const fixOrder = (rules: number[][], update: number[]): number[] => {
  let fixedUpdate: number[] = [];

  for (let i = 0; i < update.length - 1; i++) {
    let page = update[i];
    let trailingPages = update.slice(i+1);
    for (let j = 0; j < trailingPages.length; j++) {
      while (rules.filter(rule => rule[0] === page && rule[1] === trailingPages[j]).length === 0) {
        let failingRule = rules.filter(rule => rule[0] == trailingPages[j] && rule[1] == page)[0];
        //console.log('error is', trailingPages[j], failingRule);



        // todo, swap by destructuring

        //let switch1 = j;
        //let switch2 = j+1;
        let switch1 = update.indexOf(failingRule[0]);
        let switch2 = update.indexOf(failingRule[1]);

        //console.log('switching', update[switch1], update[switch2]);
        var temp = update[switch1];
        update[switch1] = update[switch2];
        update[switch2] = temp;
        page = update[i];
        trailingPages = update.slice(i+1); //
        //console.log('switched array', update);

      }
    }
    fixedUpdate.push(page);
  }
  return fixedUpdate;
}