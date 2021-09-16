export function queenLogic(queen: string) {
  const chessX = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const boardLength = 8;
  let queenX = chessX.indexOf(queen[0]) + 1;
  let queenY = parseInt(queen[1]);

  let maxIterations = Math.max(8 - queenX, 8 - queenY, queenX - 1, queenY - 1);

  const queenLocations = [];
  const queenTranslatedLocations = [];

  for (let iteration = 1; iteration <= maxIterations; iteration++) {
    if (queenX + iteration <= boardLength) {
      if (queenY + iteration <= boardLength) {
        queenLocations.push([queenX + iteration, queenY + iteration]);
      }
      if (queenY - iteration >= 1) {
        queenLocations.push([queenX + iteration, queenY - iteration]);
      }
    }
    if (queenX - iteration >= 1) {
      if (queenY - iteration >= 1) {
        queenLocations.push([queenX - iteration, queenY - iteration]);
      }
      if (queenY + iteration <= boardLength) {
        queenLocations.push([queenX - iteration, queenY + iteration]);
      }
    }
  }

  for (let location = 0; location < queenLocations.length; location++) {
    queenTranslatedLocations.push(
      chessX[queenLocations[location][0] - 1] + queenLocations[location][1]
    );
  }

  return queenTranslatedLocations;
}
