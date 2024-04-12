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

  User.findOne({ where: { email: email } }).then((user) => {
    if (user) {
      res.status(422).json({ message: "Por favor, ultilize outro e-mail!" });
      return;
    } else {
      User.create(data)
        .then(() => {
          res.status(200).json({ message: "Usuário inserido com sucesso!" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;

  if (id === undefined || isNaN(id)) {
    res.status(422).json({ message: "Id inválido!" });
    return;
  }

  User.findByPk(id)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(422).json({ message: "O orreu um error, tente mais tarde!" });
    });
});

router.put("/update", (req, res) => {
  const { id, name, email, password } = req.body;

  if (!name) {
    res.status(422).json({ message: "O nome é obrigatório!" });
    return;
  }

  if (!email) {
    res.status(422).json({ message: "O e-mail é obrigatório!" });
    return;
  }

  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt);

  var data;

  if (password) {
    data = {
      id,
      name,
      email,
      password: hash,
    };
  } else {
    data = {
      id,
      name,
      email,
    };
  }

  User.update(data, { where: { id: data.id } })
    .then(() => {
      res.status(200).json({ message: "usuário atualizada com sucesso!" });
    })
    .catch((error) => {
      res.status(422).json({ message: "Ocorreu um erro, tente mais tarde!" });
    });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  if (id !== undefined && isNaN(id)) {
    res.status(422).json({ message: "Id inválido" });
    return;
  }

  User.destroy({ where: { id: id } })
    .then(() => {
      res.status(200).json({ message: "Artigo excluído com sucesso!" });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(422).json({ message: "O e-mail é obrigatório!" });
    return;
  }

  if (!password) {
    res.status(422).json({ message: "A senha é obrigatório!" });
    return;
  }

  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        const exist = bcryptjs.compare(password, user.password);
        if (exist) {
          req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          res.status(200).json(req.session.user);
        } else {
          res.status(422).json({ message: "Senha inválida" });
          return;
        }
      } else {
        res.status(422).json({ message: "E-mail não encontrador!" });
        return;
      }
    })
    .catch((error) => {
      consolo.log(error);
    });
});

module.exports = router;
