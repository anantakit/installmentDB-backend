const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const user = require("../db/user");
const financialInfo = require("../db/financialInfo");
const transactions = require("../db/transactions");

async function start(
  name = "mongodb://103.74.254.244:27017/oddsInstallmentDB"
) {
  try {
    await mongoose.connect(name, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    app.use(bodyParser.json());

    app.get("/", (req, res) => res.send({ mesaage: "hq" }));

    app.get("/financials", async (req, res) => {
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

    app.get("/users/search", async (req, res) => {
      try {
        let checklen = req.query.name.length;
        if (checklen >= 3) {
          let users = await user.find({
            firstName: {
              $regex: "^" + req.query.name + ".*",
              $options: "i"
            }
          });
          res.send(users);
        } else {
          res.send("Input minimum 3 characters");
        }
      } catch (error) {
        res.status(500).send();
      }
    });

    app.post("/users", async (req, res) => {
      try {
        const newUserModel = new user({
          ...req.body
        });
        await newUserModel.save();
        res.status(201).end();
      } catch (error) {
        res.status(400).json(error);
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
