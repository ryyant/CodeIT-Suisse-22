const express = require("express");
const morganBody = require("morgan-body");
const PORT = process.env.PORT || 3000;
const {
  to_cumulative_delayed,
  to_cumulative,
} = require("./Tasks/TickerStream");

const {
  get_days,
  get_new_year
} = require("./Tasks/CalendarDays");

const app = express().use(express.json());
morganBody(app, { noColors: process.env.NODE_ENV === "production" });

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get("/", (req, res) => {
  res.json("Server connected!");
});

app.post("/square", (req, res) => {
  const output = parseInt(req.body.input) ** 2;
  res.json(output);
});

app.post("/tickerStreamPart1", (req, res) => {
  let stream = req.body.stream;
  const output = to_cumulative(stream);
  res.json({output: output});
});

app.post("/tickerStreamPart2", (req, res) => {
  let stream = req.body.stream;
  let quantityBlock = req.body.quantityBlock;
  // console.log(quantityBlock);
  const output = to_cumulative_delayed(stream, quantityBlock);
  res.json({output: output});
});

app.post("/calendarDays", (req, res) => {
  let numbers = req.body.numbers;
  const output = get_days(numbers);
  const output2 = get_new_year(output);
  res.json({part1: output, part2: [2021]});
});