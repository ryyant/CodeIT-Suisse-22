const e = require("express");

module.exports.magiccauldrons = async function (x) {
  let res = [];

  for (let i = 0; i < x.length; i++) {
    let r = await magic(x[i]);
    let obj = {
      part1: parseFloat(r.soup1),
      part2: parseFloat(r.time1.toFixed(0)),
      part3: parseFloat(r.soup2),
      part4: parseFloat(r.time2.toFixed(0)),
    };
    res.push(obj);
  }

  return res;
};

const magic = async (tc) => {
  let soup1 = await handlePart1(tc.part1);
  let time1 = await handlePart2(tc.part2);
  let soup2 = await handlePart3(tc.part3);
  let time2 = await handlePart4(tc.part4);

  return { soup1, time1, soup2, time2 };
};

const initMatrix = async () => {
  // only need to init these no of rows and cols.
  let rows = 100;
  let cols = 100;

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

const handlePart1 = async (part1) => {
  /*   let soupMatrix = await initMatrix();
   */ let totalSoup = part1.flow_rate * part1.time;

  return await soupFlow5(totalSoup, part1.row_number, part1.col_number);

  /*   await soupFlow1(totalSoup, 0, 0, soupMatrix);
  return soupMatrix[part1.row_number][part1.col_number] || 0; */
};

const handlePart2 = async (part2) => {
  let totalSoup = await soupFlow2(
    part2.amount_of_soup,
    part2.row_number,
    part2.col_number
  );
  let time = totalSoup / part2.flow_rate;

  return time;
};

const handlePart3 = async (part3) => {
  let soupMatrix = await initMatrix();
  let totalSoup = part3.flow_rate * part3.time;
  /*   await weirdPots(
    part3.flow_rate,
    part3.time,
    part3.row_number,
    part3.col_number
  ); */
  //return await soupFlow3(totalSoup, part3.row_number, part3.col_number, soupMatrix);

  await soupFlow3(totalSoup, 0, 0, soupMatrix);

  return soupMatrix[part3.row_number][part3.col_number] || 0;
};

const handlePart4 = async (part4) => {
  /*   let soupMatrix = await initMatrix();
  let time = await weirdPots(
    part4.flow_rate,
    part4.amount_of_soup,
    part4.row_number,
    part4.col_number,
    soupMatrix
  ); */

  let totalSoup = await soupFlow2(
    part4.amount_of_soup,
    part4.row_number,
    part4.col_number
  );

  let time = totalSoup / part4.flow_rate;

  return time;
};

// recursion method
/* const soupFlow1 = async (totalSoup, row, col, soupMatrix) => {
  if (totalSoup == 0) {
    return;
  }

  if (row >= 100 || col >= 100) {
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
}; */

const soupFlow5 = async (totalSoup, row, col) => {
  let levelSoup = ((row * (row + 1)) / 2) * 100;
  let leftOverSoup = totalSoup - levelSoup;
  let atEdge;
  if (col == row || col == 0) {
    atEdge = true;
  } else {
    atEdge = false;
  }
  let totalMultiple = 1;

  if (row == 0) {
    totalMultiple = 1;
  } else if (row == 1) {
    totalMultiple = 2;
  } else {
    let noOfColumns = row + 1;
    totalMultiple = (noOfColumns - 2) * 2 + 2;
  }

  singleFlow = leftOverSoup / totalMultiple;

  if (!atEdge) {
    singleFlow *= 2;
  }

  if (singleFlow < 0) {
    return 0;
  } else if (singleFlow > 100) {
    return 100;
  } else {
    return singleFlow;
  }
};

const soupFlow2 = async (currSoup, row, col) => {
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
  let levelSoup = ((row * (row + 1)) / 2) * 100;

  let totalSoup = lastRowSoup + levelSoup;
  return totalSoup;
};

// recursion method
const soupFlow3 = async (totalSoup, row, col, soupMatrix) => {
  if (totalSoup == 0) {
    return;
  }

  if (row >= 100 || col >= 100) {
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
const soupFlow4 = async (currSoup, row, col) => {
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
    for (let c = 0; c <= r; c++) {
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

const soupFlow6 = async (totalSoup, row, col) => {
  let levelSoup = 0;
  for (let r = 0; r < row; r++) {
    for (let c = 0; c <= r; c++) {
      if (c % 2 == 0) {
        levelSoup += 150;
      } else {
        levelSoup += 100;
      }
    }
  }
  let leftOverSoup = totalSoup - levelSoup;
  let atEdge;
  if (col == row || col == 0) {
    atEdge = true;
  } else {
    atEdge = false;
  }

  let totalMultiple = 1;

  if (row == 0) {
    totalMultiple = 1;
  } else if (row == 1) {
    totalMultiple = 2;
  } else {
    let noOfColumns = row + 1;
    totalMultiple = (noOfColumns - 2) * 2 + 2;
  }

  singleFlow = leftOverSoup / totalMultiple;

  if (!atEdge) {
    singleFlow *= 2;
  }

  let limit = 100;
  if (col % 2 == 0) {
    limit = 150;
  }
  if (singleFlow < 0) {
    return 0;
  } else if (singleFlow > limit) {
    return limit;
  } else {
    return singleFlow;
  }
};

const weirdPots = async (flowRate, soup, row, col, soupMatrix) => {
  let totalSoup = soup;

  let spilledSoup = soup;

  if (col == row) {
    totalSoup += weirdPots(spilledSoup, row - 1, col - 1, soupMatrix);
  } else if (col == 0) {
    totalSoup += weirdPots(spilledSoup, row - 1, col, soupMatrix);
  } else {
    totalSoup += weirdPots(spilledSoup, row - 1, col, soupMatrix);
    totalSoup += weirdPots(spilledSoup, row - 1, col - 1, soupMatrix);
  }

  let currSoup = soupMatrix[row][col];

  return totalSoup;
};
