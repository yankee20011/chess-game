export function bishopLogic(bishop: string) {
  const chessX = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const boardLength = 8;
  let bishopX = chessX.indexOf(bishop[0]) + 1;
  let bishopY = parseInt(bishop[1]);
  let maxIterations = Math.max(
    8 - bishopX,
    8 - bishopY,
    bishopX - 1,
    bishopY - 1
  );

  const bishopLocations = [];
  const bishopTranslatedLocations = [];

  for (let iteration = 1; iteration <= maxIterations; iteration++) {
    if (bishopX + iteration <= boardLength) {
      if (bishopY + iteration <= boardLength) {
        bishopLocations.push([bishopX + iteration, bishopY + iteration]);
      }
      if (bishopY - iteration >= 1) {
        bishopLocations.push([bishopX + iteration, bishopY - iteration]);
      }
    }
    if (bishopX - iteration >= 1) {
      if (bishopY - iteration >= 1) {
        bishopLocations.push([bishopX - iteration, bishopY - iteration]);
      }
      if (bishopY + iteration <= boardLength) {
        bishopLocations.push([bishopX - iteration, bishopY + iteration]);
      }
    }
  }

  for (let location = 0; location < bishopLocations.length; location++) {
    bishopTranslatedLocations.push(
      chessX[bishopLocations[location][0] - 1] + bishopLocations[location][1]
    );
  }

  return bishopTranslatedLocations;
}
