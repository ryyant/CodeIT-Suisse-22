module.exports.magiccauldrons = function (x) {
  let res = x.map((tc) => {
    let soup1 = handlePart1(tc.part1);
    let time1 = handlePart2(tc.part2);
    let soup2 = handlePart3(tc.part3);
    let time2 = handlePart4(tc.part4);
    return {
      part1: soup1.toFixed(2),
      part2: time1,
      part3: soup2.toFixed(2),
      part4: time2,
    };
  });
  return res;
};

const initMatrix = (part) => {
  // only need to init these no of rows and cols.
  let rows = part.row_number + 1;
  let cols = part.col_number + 1;

  let soupMatrix = new Array(rows);
  for (var i = 0; i < rows; i++) {
    soupMatrix[i] = new Array(cols);
  }

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      soupMatrix[i][j] = 0;
    }
  }

  return soupMatrix;
};

const handlePart1 = (part1) => {
  let soupMatrix = initMatrix(part1);
  let totalSoup = part1.flow_rate * part1.time;
  soupFlow1(totalSoup, 0, 0, soupMatrix);

  return soupMatrix[part1.row_number][part1.col_number] || 0;
};

const handlePart2 = (part2) => {
  let totalSoup = soupFlow2(
    part2.amount_of_soup,
    part2.row_number,
    part2.col_number
  );
  let time = totalSoup / part2.flow_rate;

  return time;
};

const handlePart3 = (part3) => {
  let soupMatrix = initMatrix(part3);
  let totalSoup = part3.flow_rate * part3.time;
  soupFlow3(totalSoup, 0, 0, soupMatrix);

  return soupMatrix[part3.row_number][part3.col_number] || 0;
};

const handlePart4 = (part4) => {
  let totalSoup = soupFlow4(
    part4.amount_of_soup,
    part4.row_number,
    part4.col_number
  );
  let time = totalSoup / part4.flow_rate;

  return time;
};

// recursion method
const soupFlow1 = (totalSoup, row, col, soupMatrix) => {
  let rowLimit = soupMatrix.length;

  if (row >= rowLimit) {
    return;
  }

  let currSoup = soupMatrix[row][col];

  if (currSoup + totalSoup >= 100) {
    soupMatrix[row][col] = 100;
    // overflow
    let soupAdded = 100 - currSoup;
    soupFlow1((totalSoup - soupAdded) / 2, row + 1, col, soupMatrix);
    soupFlow1((totalSoup - soupAdded) / 2, row + 1, col + 1, soupMatrix);
  } else {
    soupMatrix[row][col] = currSoup + totalSoup;
  }
};

// recursion method
const soupFlow2 = (currSoup, row, col) => {
  let multiplier = 1;
  let atEdge;
  if (col == row || col == 0) {
    multiplier = 1;
    atEdge = true;
  } else {
    multiplier = 2;
    atEdge = false;
  }

  let singleFlow = currSoup / multiplier;

  let lastRowSoup = 0;

  let totalMultiple = multiplier;

  if (row == 0) {
    totalMultiple = 1;
  } else if (row == 1) {
    totalMultiple++;
  } else {
    let noOfColumns = row + 1;
    if (atEdge) {
      totalMultiple += 1 + (noOfColumns - 2) * 2;
    } else {
      totalMultiple += 2 + (noOfColumns - 3) * 2;
    }
  }

  lastRowSoup = singleFlow * totalMultiple;
  let levelSoup = 0;
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < row; c++) {
      levelSoup += 100;
    }
  }

  let totalSoup = lastRowSoup + levelSoup;
  return totalSoup;
};

// recursion method
const soupFlow3 = (totalSoup, row, col, soupMatrix) => {
  let rowLimit = soupMatrix.length;

  if (row >= rowLimit) {
    return;
  }

  let currSoup = soupMatrix[row][col];

  let soupLimit = 100;
  if (col % 2 == 0) {
    soupLimit = 150;
  }
  if (currSoup + totalSoup >= soupLimit) {
    soupMatrix[row][col] = soupLimit;
    // overflow
    let soupAdded = soupLimit - currSoup;
    soupFlow3((totalSoup - soupAdded) / 2, row + 1, col, soupMatrix);
    soupFlow3((totalSoup - soupAdded) / 2, row + 1, col + 1, soupMatrix);
  } else {
    soupMatrix[row][col] = currSoup + totalSoup;
  }
};

// recursion method
const soupFlow4 = (currSoup, row, col) => {
  let multiplier = 1;
  let atEdge;
  if (col == row || col == 0) {
    multiplier = 1;
    atEdge = true;
  } else {
    multiplier = 2;
    atEdge = false;
  }

  let singleFlow = currSoup / multiplier;

  let lastRowSoup = 0;

  let totalMultiple = multiplier;

  if (row == 0) {
    totalMultiple = 1;
  } else if (row == 1) {
    totalMultiple++;
  } else {
    let noOfColumns = row + 1;
    if (atEdge) {
      totalMultiple += 1 + (noOfColumns - 2) * 2;
    } else {
      totalMultiple += 2 + (noOfColumns - 3) * 2;
    }
  }

  lastRowSoup = singleFlow * totalMultiple;
  let levelSoup = 0;
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < row; c++) {
      if (c % 2 == 0) {
        levelSoup += 150;
      } else {
        levelSoup += 100;
      }
    }
  }

  let totalSoup = lastRowSoup + levelSoup;
  return totalSoup;
};
