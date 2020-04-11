const express = require("express");

const db = require("../data/dbConfig.js");

const accountRouter = require('../accounts/account-router')//IMPORTANT TO IMPORT ROUTER TO SERVER

const server = express();

server.use(express.json());

/////
server.use("/api/accounts", accountRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});


module.exports = server;
