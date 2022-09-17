rubix = function (body) {
  let ops = body.ops;
  let initialState = body.state;
  let up = initialState.u;
  let left = initialState.l;
  let front = initialState.f;
  let right = initialState.r;
  let back = initialState.b;
  let down = initialState.d;

  let commands = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops.charAt(i + 1) != "i") {
      commands.push(ops.charAt(i));
    } else {
      commands.push(ops.substring(i, i + 2));
      i++;
    }
  }

/*   console.log(commands);
 */
  for (let i = 0; i < commands.length; i++) {
    let command = commands[i];
    let temp = [];
    // affects LEFT FRONT RIGHT BACK
    if (command.charAt(0) == "U") {
      if (command.charAt(1) == "i") {
        temp = back[0];
        back[0] = right[0];
        right[0] = front[0];
        front[0] = left[0];
        left[0] = temp;
      } else {
        temp[0] = left[0];
        left[0] = back[0];
        front[0] = left[0];
        right[0] = front[0];
        back = temp;
      }
    }

    if (command.charAt(0) == "D") {
      if (command.charAt(1) == "i") {
        temp = left[2];
        left[2] = back[2];
        front[2] = left[2];
        right[2] = front[2];
        back[2] = temp;
      } else {
        temp = back[2];
        back[2] = right[2];
        right[2] = front[2];
        front[2] = left[2];
        left[2] = temp;
      }
    }

    if (command.charAt(0) == "L") {
      if (command.charAt(1) == "i") {
        temp = back[0][2];
        back[0][2] = up[2][0];
        up[2][0] = front[2][0];
        front[2][0] = down[2][0];
        down[2][0] = temp;

        temp = back[1][2];
        back[1][2] = up[1][0];
        up[1][0] = front[1][0];
        front[1][0] = down[1][0];
        down[1][0] = temp;

        temp = back[2][2];
        back[2][2] = up[0][0];
        up[0][0] = front[0][0];
        front[0][0] = down[0][0];
        down[0][0] = temp;
      } else {
        temp = down[2][0];
        down[2][0] = front[2][0];
        front[2][0] = up[2][0];
        up[2][0] = back[2][2];
        back[2][2] = temp;

        temp = down[1][0];
        down[1][0] = front[1][0];
        front[1][0] = up[1][0];
        up[1][0] = back[1][2];
        back[1][2] = temp;

        temp = down[0][0];
        down[0][0] = front[0][0];
        front[0][0] = up[0][0];
        up[0][0] = back[0][2];
        back[0][2] = temp;
      }
    }

    if (command.charAt(0) == "R") {
      if (command.charAt(1) == "i") {
        // ACW
        temp = down[2][2];
        down[2][2] = front[2][2];
        front[2][2] = up[2][2];
        up[2][2] = back[2][0];
        back[2][0] = temp;

        temp = down[1][2];
        down[1][2] = front[1][2];
        front[1][2] = up[1][2];
        up[1][2] = back[1][0];
        back[1][0] = temp;

        temp = down[0][2];
        down[0][2] = front[0][2];
        front[0][2] = up[0][2];
        up[0][2] = back[2][0];
        back[2][0] = temp;
      } else {
        // CW
        temp = up[2][2];
        up[2][2] = front[2][2];
        front[2][2] = down[2][2];
        down[2][2] = back[0][0];
        back[0][0] = temp;

        temp = up[1][2];
        up[1][2] = front[1][2];
        front[1][2] = down[1][2];
        down[1][2] = back[1][0];
        back[1][0] = temp;

        temp = up[0][2];
        up[0][2] = front[0][2];
        front[0][2] = down[0][2];
        down[0][2] = back[2][0];
        back[2][0] = temp;
      }
    }

    if (command.charAt(0) == "F") {
      if (command.charAt(1) == "i") {
        temp = right[0][0];
        right[0][0] = down[0][2];
        down[0][2] = left[2][2];
        left[2][2] = up[2][0];
        up[2][0] = temp;

        temp = right[1][0];
        right[1][0] = down[0][1];
        down[0][1] = left[1][2];
        left[1][2] = up[2][1];
        up[2][1] = temp;

        temp = right[2][0];
        right[2][0] = down[0][0];
        down[0][0] = left[0][2];
        left[0][2] = up[2][2];
        up[2][2] = temp;
      } else {
        temp = up[2][0];
        up[2][0] = left[2][2];
        left[2][2] = down[0][2];
        down[0][2] = right[0][0];
        right[0][0] = temp;

        temp = up[2][1];
        up[2][1] = left[1][2];
        left[1][2] = down[0][1];
        down[0][1] = right[1][0];
        right[1][0] = temp;

        temp = up[2][2];
        up[2][2] = left[0][2];
        left[0][2] = down[0][0];
        down[0][0] = right[2][0];
        right[2][0] = temp;
      }
    }

    if (command.charAt(0) == "B") {
      if (command.charAt(1) == "i") {
        temp = left[0][0];
        left[0][0] = down[2][0];
        down[2][0] = right[2][2];
        right[2][2] = up[0][2];
        up[0][2] = temp;

        temp = left[1][0];
        left[1][0] = down[2][1];
        down[2][1] = right[1][2];
        right[1][2] = up[0][1];
        up[0][1] = temp;

        temp = left[2][0];
        left[2][0] = down[2][2];
        down[2][2] = right[0][2];
        right[0][2] = up[0][0];
        up[0][0] = temp;
      } else {
        temp = left[0][0];
        left[0][0] = up[0][2];
        up[0][2] = right[2][2];
        right[2][2] = down[2][0];
        down[2][0] = temp;

        temp = left[1][0];
        left[1][0] = up[0][1];
        up[0][1] = right[1][2];
        right[1][2] = down[2][1];
        down[2][1] = temp;

        temp = left[2][0];
        left[2][0] = up[0][0];
        up[0][0] = right[0][2];
        right[0][2] = down[2][2];
        down[2][2] = temp;
      }
    }
  }

/*   console.log(up);
  console.log(left);
  console.log(front);
  console.log(right);
  console.log(back);
  console.log(down); */
  let state = { u: up, l: left, f: front, r: right, b: back, d: down };

  return state;
};
module.exports = { rubix };
