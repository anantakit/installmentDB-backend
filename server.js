const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const user = require("./src/db/user");
const financialInfo = require("./src/db/financialInfo");
const transactions = require("./src/db/transactions")
mongoose
  .connect("mongodb://103.74.254.244:27017/oddsInstallmentDB", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send({ mesaage: "hq" }));

app.get("/finacials", async (req, res) => {
  try {
    let finacials = await financialInfo.find({});
    res.send(finacials);
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/users", async (req, res) => {
  try {
    let users = await user.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/transactions", async (req, res) => {
  try {
    let transaction = await transactions.find({});
    res.send(transaction);
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
