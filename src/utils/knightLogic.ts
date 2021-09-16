export function knightLogic(cell: string) {
  var possibleCoordinates: Array<string> = [];
  var xCoordinates = ["a", "b", "c", "d", "e", "f", "g", "h"];
  var cellX = xCoordinates.indexOf(cell[0]) + 1;
  var cellY = parseInt(cell[1]);

  var cellXpositions = [cellX + 2, cellX - 2, cellX + 1, cellX - 1].filter(
    function (cellPosition) {
      return cellPosition > 0 && cellPosition < 9;
    }
  );

  var cellYpositions = [cellY + 2, cellY - 2, cellY + 1, cellY - 1].filter(
    function (cellPosition) {
      return cellPosition > 0 && cellPosition < 9;
    }
  );

  for (var i = 0; i < cellXpositions.length; i++) {
    for (var j = 0; j < cellYpositions.length; j++) {
      if (
        Math.abs(cellX - cellXpositions[i]) +
          Math.abs(cellY - cellYpositions[j]) ===
        3
      ) {
        if (
          !possibleCoordinates.includes(
            xCoordinates[cellXpositions[i] - 1] + cellYpositions[j]
          )
        ) {
          possibleCoordinates.push(
            xCoordinates[cellXpositions[i] - 1] + cellYpositions[j]
          );
        }
      }
    }
  }

  return possibleCoordinates;
}
