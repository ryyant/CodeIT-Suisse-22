const express = require("express");
const morganBody = require("morgan-body");
const PORT = process.env.PORT || 3000;
const {
  to_cumulative_delayed,
  to_cumulative,
} = require("./Tasks/TickerStream");
const { CryptoCollapz } = require("./Tasks/CryptoCollapz");

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
  res.json({ output: output });
});

app.post("/tickerStreamPart2", (req, res) => {
  let stream = req.body.stream;
  let quantityBlock = req.body.quantityBlock;
  const output = to_cumulative_delayed(stream, quantityBlock);
  res.json({ output: output });
});

app.post("/cryptocollapz", (req, res) => {
  let arr = req.body;
  console.log(arr);
  const output = CryptoCollapz(arr);
  res.json(output);
});
