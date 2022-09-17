const express = require("express");
const morganBody = require("morgan-body");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

const {
  to_cumulative_delayed,
  to_cumulative,
} = require("./Tasks/TickerStream");
const { CryptoCollapz } = require("./Tasks/CryptoCollapz");
const { magiccauldrons } = require("./Tasks/MagicCauldron");
const { get_days, get_new_year } = require("./Tasks/CalendarDays");
const { get_letters, form_letters } = require("./Tasks/QuordleKeyboard");
const { get_steps } = require("./Tasks/TravellingRobot");
const { rubix } = require("./Tasks/Rubix");

const app = express();
app.use(bodyParser.json({ limit: "200mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(express.text({ limit: "200mb" }));

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
  // console.log(quantityBlock);
  const output = to_cumulative_delayed(stream, quantityBlock);
  res.json({ output: output });
});

app.post("/cryptocollapz", (req, res) => {
  let arr = req.body;
  const output = CryptoCollapz(arr);
  res.json(output);
});

app.post("/magiccauldrons", async (req, res) => {
  let arr = req.body;
  const output = await magiccauldrons(arr);
  res.json(output);
});

app.post("/calendarDays", (req, res) => {
  let numbers = req.body.numbers;
  const output = get_days(numbers);
  const output2 = get_new_year(output);
  res.json({ part1: output, part2: output2 });
});

app.post("/reversle", (req, res) => {
  let length = req.body.equationLength;
  const output = get_eqn(length);
  res.json({ equation: output });
});

app.post("/quordleKeyboard", (req, res) => {
  let answers = req.body.answers;
  let attempts = req.body.attempts;
  let numbers = req.body.numbers;
  const output = get_letters(answers, attempts)[0];
  const output2 = form_letters(answers, attempts, numbers);
  res.json({ part1: output, part2: output2 });
});

app.post("/travelling-suisse-robot", (req, res) => {
  const output = get_steps(req.body);
  res.send(output);
});

app.post("/rubix", (req, res) => {
  const output = rubix(req.body);
  res.send(output);
});
