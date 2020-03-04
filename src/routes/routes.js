const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const user = require("../db/user");
const financialInfo = require("../db/financialInfo");
const transactions = require("../db/transactions");

async function start() {
  try {
    await mongoose.connect("mongodb://103.74.254.244:27017/oddsInstallmentDB", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    app.use(bodyParser.json());

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

    app.get("/users/:searchName", async (req, res) => {
      console.log(req.params.searchName);
      try {
        let checklen = req.params.searchName.length;
        console.log(checklen);
        if (checklen >= 3) {
          let users = await user.find({
            firstName: { $regex: "^" + req.params.searchName + ".*" }
          });
          res.send(users);
        } else {
          res.send("Input minimum 3 characters");
        }
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
  } catch (error) {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  }
}

module.exports = { app, start };
