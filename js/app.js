const cors = require("cors");
const readAndParse = require("./epa.js");

const express = require("express");

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  const data = require("./access_logs.json");
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
