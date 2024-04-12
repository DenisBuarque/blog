const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
  User.findAll({ raw: true })
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/store", (req, res) => {
  res.send("");
});

router.get("/edit/:id", (req, res) => {
  res.send("");
});

router.put("/update", (req, res) => {
  res.send("");
});

router.delete("/delete/:id", (req, res) => {
  res.send("");
});

module.exports = router;
