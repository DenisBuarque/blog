const express = require("express");
const bcryptjs = require("bcryptjs");
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
  const { name, email, password } = req.body;

  if (!name) {
    res.status(422).json({ message: "O nome é obrigatório!" });
    return;
  }

  if (!email) {
    res.status(422).json({ message: "O e-mail é obrigatório!" });
    return;
  }

  if (!password) {
    res.status(422).json({ message: "A senha é obrigatório!" });
    return;
  }

  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt);

  const data = {
    name,
    email,
    password: hash,
  };

  User.create(data)
    .then(() => {
      res.status(200).json({ message: "Usuário inserido com sucesso!" });
    })
    .catch((error) => {
      console.log(error);
    });
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
