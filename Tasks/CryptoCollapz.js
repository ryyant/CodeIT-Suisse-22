const collapz = (arr) => {
  return arr.map((num) => {
    let max = num;
    while (num > 0) {
      if (num % 2 == 0) {
        num = even(num);
      } else {
        num = odd(num);
      }

      if (num > max) {
        max = num;
      }
      if (num == 1) {
        if (max < 4) {
            max = 4;
        }
        break;
      }
    }

    return max;
  });
};

const even = (n) => {
  return n / 2;
};

const odd = (n) => {
  return n * 3 + 1;
};

module.exports.CryptoCollapz = function (x) {
  x = x.map((element) => {
    return (element = collapz(element));
  });

  return x;
};
