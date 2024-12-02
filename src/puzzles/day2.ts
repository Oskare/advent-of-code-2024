export const partA = (input: string): string => {
  return input.split("\n")
    .map(report => {
      const parts = report.split(" ").map(Number);
      let increasing = true;
      let decreasing = true;
      let difference = true;

      for (let i = 0; i < report.length; i++) {
        if (i != report.length) {
          if (parts[i] < parts[i+1]) {
            decreasing = false;
          }
          if (parts[i] > parts[i+1]) {
            increasing = false;
          }
          if (Math.abs(parts[i] - parts[i+1]) > 3 || Math.abs(parts[i] - parts[i+1]) < 1) {
            difference = false;
          }
        }
      }
      return (increasing || decreasing) && difference ? Number(1) : 0;
    })
    .reduce((sum, curr) => sum + curr)
    .toString();
}

export const partB = (input: string): string => {
  return input.split("\n")
    .map((report, index) => {
      const parts = report.split(" ").map(Number);
      let increasing = true;
      let decreasing = true;
      let difference = true;
      let dampener = 2;
      let useDampener = false;

      const safe = isSafe(parts, true);


      console.log(`report ${index+1}: ${safe}`)
      return safe ? Number(1) : 0;
    })
    .reduce((sum, curr) => sum + curr)
    .toString();
}

const isSafe = (parts: number[], firstAttempt: boolean): number => {
  let increasing = true;
  let decreasing = true;
  let difference = true;

  let firstDecreaseFail = null;
  let firstIncreasFail = null;
  let firstDiffFail = null;

  for (let i = 0; i < parts.length - 1 && (increasing || decreasing) && difference; i++) {
    if (i != parts.length) {
      if (parts[i] < parts[i+1]) {
        decreasing = false;
        if (!firstDecreaseFail)
          firstDecreaseFail = i+1;
      }
      if (parts[i] > parts[i+1]) {
        increasing = false;
        if (!firstIncreasFail)
          firstIncreasFail = i+1;
      }
      if (Math.abs(parts[i] - parts[i+1]) > 3 || Math.abs(parts[i] - parts[i+1]) < 1) {
        difference = false;
        if (!firstDiffFail)
          firstDiffFail = i+1;
      }
    }
  }

  if (!((increasing || decreasing) && difference) && firstAttempt) {

    /*
    let firstDirFail = Math.max(firstDecreaseFail, firstIncreasFail);
    console.log('firstDirFail', firstDirFail)
    console.log('firstDiffFail', firstDiffFail)

    let firstFail = 0;
    if (firstDirFail == 1)
      firstFail = firstDiffFail;
    else if (firstDiffFail == 0 || firstDiffFail == null)
      firstFail = firstDirFail;
    else
      firstFail = Math.min(firstDirFail, firstDiffFail);

    console.log('firstFail', firstFail)
    const parts2 = parts.slice(); // create a copy of the array
    const parts3 = parts.slice(); // create a copy of the array
    const parts4 = parts.slice(); // create a copy of the array
    parts2.splice(firstFail-1, 1);
    parts3.splice(firstFail, 1);
    parts4.splice(firstFail+1, 1);
    console.log(`retrying with ${parts2}`);
    console.log(`retrying with ${parts3}`);
    console.log(`retrying with ${parts4}`);
    return isSafe(parts2, false) || isSafe(parts3, false) || isSafe(parts4, false);
*/
    for (let j = 0; j < parts.length; j++){
      let test = parts.slice();
      test.splice(j, 1);
      console.log(`retrying with ${test}`);

      if (isSafe(test, false)) {
        return 1;
      }
    }
  }



  return (increasing || decreasing) && difference ? Number(1) : 0;
}