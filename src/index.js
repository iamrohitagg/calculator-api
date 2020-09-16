const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

// Input value limit
const inputlimit = Math.pow(10, 7);

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
// your code goes here

// here

// Check the app is connected or not
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Check if the number is integer, negative or float number
const checkNumber = (req, res) => {
  let num1 = req.body.num1;
  let num2 = req.body.num2;
  if (typeof num1 === "string" || typeof num2 === "string") {
    return res.json({
      status: "error",
      message: "invalid data types",
    });
  }
};

// Check input number limit .
// Must be less than 10M
const checkInputLimit = (num1, num2, res) => {
  if (num1 > inputlimit || num2 > inputlimit) {
    return res.json({
      status: "error",
      message: "overflow",
    });
  }
};

// API route for adding two numbers
app.post("/add", (req, res) => {
  let num1 = req.body.num1;
  let num2 = req.body.num2;

  checkNumber(req, res);
  checkInputLimit(num1, num2, res);

  if (num1 + num2 > inputlimit) {
    return res.json({
      status: "error",
      message: "Overflow",
    });
  }

  return res.json({
    status: "success",
    message: "the sum of given two number",
    sum: num1 + num2,
  });
});

// API route for subtracting numbers
app.post("/sub", (req, res) => {
  let num1 = req.body.num1;
  let num2 = req.body.num2;

  checkNumber(req, res);
  checkInputLimit(num1, num2, res);

  if (num1 - num2 < -1000000) {
    res.json({
      status: "error",
      message: "Underflow",
    });
  }

  res.json({
    status: 200,
    message: "the difference of given two number",
    sum: num1 - num2,
  });
});

// API route to multiply number
app.post("/multiply", (req, res) => {
  let num1 = req.body.num1;
  let num2 = req.body.num2;

  checkNumber(req, res);

  checkInputLimit(num1, num2, res);

  res.json({
    status: "success",
    message: "The product of given numbers",
    sum: num1 * num2,
  });
});

// API route to divide number
app.post("/division", (req, res) => {
  let num1 = req.body.num1;
  let num2 = req.body.num2;

  checkNumber(req, res);
  checkInputLimit(num1, num2, res);

  if (num2 === 0) {
    return res.json({
      status: "error",
      message: "Cannot divide by zero",
    });
  }

  res.json({
    status: "success",
    message: "The division of given numbers",
    sum: num1 / num2,
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
