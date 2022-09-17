class Coord {
    constructor(row, col, direction) {
        this.row = row;
        this.col = col;
        this.direction = direction;
    }

    getRow() {
        return this.row;
    }

    getCol() {
        return this.col;
    }

    getDirection() {
        return this.direction;
    }
}

// direction: 0 up, 1 right, 2 down, 3 left

const get_steps = (input) => {
    let grid = input.split(/\r?\n/);
    let word = "CODEITSUISSE";
    let charCoord = new Map();
    let start;
    for (row=0; row < grid.length; row++) {
        for (col = 0; col < grid[0].length; col++) {
            let char = grid[row].charAt(col);
            if (char != " ") {
                if (char == 'X') {
                    start = new Coord(row, col, 0);
                } else {
                    updateMap(char, charCoord, null);     
                }
            } else {
                continue;
            }
        }
    }
    let finalString = '';
    let curr = start;

    //iterate through CODEITSUISSE
    for (n = 0; n<word.length;n++) {
        let char = word.charAt(n);
        // function returns a coordinate
        let nextCoord = findNearestDist(curr, char, charCoord);

        // getsteps gets to steps to next coord from curr, return ['LLSSSS', 2]
        let arr = getSteps(curr, nextCoord);
        finalString += arr[0];
        // add in direction here
        curr = new Coord(nextCoord.getRow(), nextCoord.getCol(), arr[1]);
    }

    return finalString;

}

const getSteps = (curr, dest) => {
    let res = '';
    let currRow = curr.getRow();
    let destRow = dest.getRow();
    let currCol = curr.getCol();
    let destCol= dest.getCol();
    let currDir = curr.getDirection();
    let newDir;

    if (currRow == destRow) {
        if (destCol > currCol) {
            if (currDir == 0) {
                res += 'R';
            } else if (currDir == 2) {
                res += 'L';
            } else if (currDir == 3) {
                res += 'RR'
            }
            res += 'S'.repeat(destCol - currCol);
            res += 'P';
            newDir = 1;
        } else {
            if (currDir == 0) {
                res += 'L';
            } else if (currDir == 2) {
                res += 'R';
            } else if (currDir == 1) {
                res += 'LL'
            }
            res += 'S'.repeat(currCol - destCol);
            res += 'P';
            newDir = 3;
        }
    } else if (currRow > destRow) { // need to move up
        if (currDir == 1) {
            res += 'L';
        } else if (currDir == 2) {
            res += 'RR';
        } else if (currDir == 3) {
            res += 'R'
        }
        res += 'S'.repeat(currRow - destRow);
        if (destCol > currCol) {
            res += 'R';
            res += 'S'.repeat(destCol - currCol);
            res += 'P';
            newDir = 1;
        } else if (destCol < currCol) {
            res += 'L';
            res += 'S'.repeat(currCol - destCol);
            res += 'P';
            newDir = 3;
        } else {
            res += 'P';
            newDir = 0;
        }
    } else if (currRow < destRow) { // move down
        if (currDir == 1) {
            res += 'R';
        } else if (currDir == 0) {
            res += 'RR';
        } else if (currDir == 3) {
            res += 'L'
        }
        res += 'S'.repeat(destRow - currRow);
        if (destCol > currCol) {
            res += 'L';
            res += 'S'.repeat(destCol - currCol);
            res += 'P';
            newDir = 1;
        } else if (destCol < currCol) {
            res += 'R';
            res += 'S'.repeat(currCol - destCol);
            res += 'P';
            newDir = 3;
        } else {
            res += 'P';
            newDir = 2;
        }
    }
    return [res, newDir];
}

const updateMap = (char, map) => {
    if (!map.has(char)) {
        map.set(char, []);
        map.get(char).push(new Coord(row, col));
    } else {
        map.get(char).push(new Coord(row, col));
    }
}

const findNearestDist = (curr, char, map) => {
    let currClosest;
    let currDist = Number.MAX_SAFE_INTEGER;
    let currIndex;
    // get list of coordinate for that char
    let coords = map.get(char);

    // loop through, find coord w closest dist
    for (i = 0; i < coords.length; i++) {
        let coord = coords[i];
        let dist = calculateDist(curr, coord);
        if (dist < currDist) {
            currDist = dist;
            currClosest = coord;
            currIndex = i;
        }
    }
    // at the end, remove this coord from the map and return this coord
    map.get(char).splice(currIndex, 1);
    return currClosest;
}

const calculateDist = (c1, c2) => {
    let x = c1.getRow() - c2.getRow();
    let y = c1.getCol() - c2.getCol();
    return Math.sqrt(x * x + y * y);
}

module.exports = { get_steps };

module.exports.add = function (x) {
    return x;
};