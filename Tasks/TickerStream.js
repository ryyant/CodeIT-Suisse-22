const to_cumulative = (ticks) => {
  let ticksObjs = ticks
    .map((i) => {
      let t = i.split(",");
      let ticker = t[1];
      let timestamp = t[0];
      let quantity = parseFloat(t[2]);
      let notional = parseFloat(t[2] * t[3]);
      return { ticker, timestamp, quantity, notional };
    })
    .sort((a, b) => {
      if (a.timestamp.localeCompare(b.timestamp) == 0) {
        return a.ticker.localeCompare(b.ticker);
      } else {
        return a.timestamp.localeCompare(b.timestamp);
      }
    });

  let tickerQty = new Map();
  let tickerNot = new Map();

  let currTimestamp = ticksObjs[0].timestamp;
  let currTicker = ticksObjs[0].ticker;

  let updateMap = (tick) => {
    if (!tickerQty.has(tick.ticker)) {
      tickerQty.set(tick.ticker, tick.quantity);
    } else {
      tickerQty.set(tick.ticker, tickerQty.get(tick.ticker) + tick.quantity);
    }

    if (!tickerNot.has(tick.ticker)) {
      tickerNot.set(tick.ticker, tick.notional);
    } else {
      tickerNot.set(tick.ticker, tickerNot.get(tick.ticker) + tick.notional);
    }
  };

  let updateResult = (timestamp, ticker) => {
    if (timestamp) {
      result.push(
        timestamp +
        "," +
        ticker +
        "," +
        tickerQty.get(ticker) +
        "," +
        tickerNot.get(ticker)
      );
    } else {
      result[timestampTracker] +=
        "," +
        ticker +
        "," +
        tickerQty.get(ticker) +
        "," +
        tickerNot.get(ticker);
    }
  };

  let result = [];
  let timestampTracker = 0;

  for (i = 0; i < ticksObjs.length; i++) {
    let tick = ticksObjs[i];
    if (tick.timestamp.localeCompare(currTimestamp) == 0) {
      if (tick.ticker.localeCompare(currTicker) == 0) {
        // ticker and time same
        updateMap(tick);
        if (i == ticksObjs.length - 1) {
          updateResult(currTimestamp, currTicker);
        }
      } else {
        // time same, ticker changed
        updateResult(currTimestamp, currTicker);
        updateMap(tick);
        currTicker = tick.ticker;
        if (i == ticksObjs.length - 1) {
          updateResult(currTimestamp, currTicker);
        }
      }
    } else {
      // time has changed
      updateResult(currTimestamp, currTicker);
      currTimestamp = tick.timestamp;
      currTicker = tick.ticker;
      timestampTracker++;
      updateMap(tick);
      if (i == ticksObjs.length - 1) {
        updateResult(currTimestamp, currTicker);
      }
    }
  }

  return result;
};

const to_cumulative_delayed = (ticks, quantity_block) => {
  let ticksObjs = ticks
    .map((i) => {
      let t = i.split(",");
      let ticker = t[1];
      let timestamp = t[0];
      let quantity = parseFloat(t[2]);
      let price = parseFloat(t[3]);
      let notional = parseFloat(t[2] * t[3]);
      return { ticker, timestamp, quantity, price, notional };
    })
    .sort((a, b) => {
      if (a.timestamp.localeCompare(b.timestamp) == 0) {
        return a.ticker.localeCompare(b.ticker);
      } else {
        return a.timestamp.localeCompare(b.timestamp);
      }
    });

  let tickerQty = new Map();
  let tickerPrice = new Map();
  let tickerNot = new Map();
  let tickerMultiple = new Map();

  let currTimestamp = ticksObjs[0].timestamp;
  let currTicker = ticksObjs[0].ticker;

  let updateMap = (tick) => {
    if (!tickerQty.has(tick.ticker)) {
      tickerQty.set(tick.ticker, tick.quantity);
    } else {
      tickerQty.set(tick.ticker, tickerQty.get(tick.ticker) + tick.quantity);
    }

    tickerPrice.set(tick.ticker, tick.price);

    if (!tickerNot.has(tick.ticker)) {
      tickerNot.set(tick.ticker, tick.notional);
    } else {
      tickerNot.set(tick.ticker, tickerNot.get(tick.ticker) + tick.notional);
    }
  };

  let updateResult = (timestamp, ticker) => {
    let qty = tickerQty.get(ticker);
    let price = tickerPrice.get(ticker);
    let notional = tickerNot.get(ticker) - (qty % quantity_block) * price;

    let multiple = tickerMultiple.get(ticker);

    qty = qty - (qty % quantity_block);

    if (qty == 0) {
      return;
    }

    if (multiple && qty < multiple) {
      return;
    }

    if (!multiple) {
      tickerMultiple.set(ticker, quantity_block);
      multiple = quantity_block;
    }

    if (result[timestampTracker] == null) {
      result.push(
        timestamp + "," + ticker + "," + qty + "," + notional.toFixed(1)
      );
    } else {
      result[timestampTracker] +=
        "," + ticker + "," + qty + "," + notional.toFixed(1);
    }

    tickerMultiple.set(ticker, multiple + quantity_block);
  };

  let result = [];
  let timestampTracker = 0;

  for (i = 0; i < ticksObjs.length; i++) {
    let tick = ticksObjs[i];
    if (tick.timestamp.localeCompare(currTimestamp) == 0) {
      if (tick.ticker.localeCompare(currTicker) == 0) {
        // ticker and time same
        updateMap(tick);
        if (i == ticksObjs.length - 1) {
          updateResult(currTimestamp, currTicker);
        }
      } else {
        // time same, ticker changed
        updateResult(currTimestamp, currTicker);
        updateMap(tick);
        updateResult(currTimestamp, tick.ticker);
        currTicker = tick.ticker;
      }
    } else {
      // time has changed
      currTimestamp = tick.timestamp;
      currTicker = tick.ticker;
      timestampTracker++;
      updateMap(tick);
      updateResult(currTimestamp, currTicker);
    }
  }

  return result;
};

module.exports = { to_cumulative, to_cumulative_delayed };

module.exports.add = function (x, y) {
  return x + y;
};