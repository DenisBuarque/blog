const express = require("express");
const router = express.Router();

const slugify = require("slugify");

const userAuth = require('../middlewares/userAuth');

const Article = require("../models/Article");
const Category = require("../models/Category");

router.get("/", userAuth, (req, res) => {
  //Article.findAll({ include:[{ model: Category }], raw: true })
  Article.findAll({ raw: true })
    .then((articles) => {
      res.status(200).json({ articles });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/store", userAuth, (req, res) => {
  const { title, description, category } = req.body;

  if (!title) {
    res.status(422).json({message: "Digite o título do artigo."});
    return;
  }

  if (!description) {
    res.status(422).json({message: "Digite a descrição do artigo."});
    return;
  }

  if (!category) {
    res.status(422).json({message: "Selecione uma categoria."});
    return;
  }

  const data = {
    title,
    slug: slugify(title),
    description,
    categoryId: category,
  };

  Article.create(data)
    .then(() => {
      res.status(200).json({ message: "Artigo criado com sucesso." });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/delete/:id", userAuth, (req, res) => {
  const id = req.params.id;

  if (id === undefined || isNaN(id)) {
    res.status(422).json({ message: "Id inválido!" });
    return;
  }

  Article.destroy({ where: { id: id } })
    .then(() => {
      res.status(200).json({ message: "Artigo excluído com sucesso!" });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/show/:slug", userAuth, (req, res) => {
  const slug = req.params.slug;

  Article.findOne({ where: { slug: slug } })
    .then((article) => {
      if (article) {
        res.status(200).json({ article });
      } else {
        res.status(422).json({ message: "Artigo não encontrado" });
        return;
      }
    })
    .catch((error) => {
      res.status(401).json({ message: "Ocorreu um error, tente mais tarde!" });
    });
});

router.get("/edit/:id", userAuth, (req, res) => {
  const id = req.params.id;

  if (id === undefined || isNaN(id)) {
    res.status(422).json({ message: "Id inválido!" });
    return;
  }

  Article.findByPk(id)
    .then((article) => {
      res.status(200).json({ article });
    })
    .catch((error) => {
      res.status(401).json({ message: "O orreu um error, tente mais tarde!" });
    });
});

router.put("/update", userAuth, (req, res) => {
  const { id, title, description, category } = req.body;

  if (!title) {
    res.status(422).json({message: "Digite o título do artigo."});
    return;
  }

  if (!description) {
    res.status(422).json({message: "Digite a descrição do artigo."});
    return;
  }

  if (category === undefined) {
    res.status(422).json({message: "Selecione uma categoria."});
    return;
  }

  const data = {
    id, 
    title,
    slug: slugify(title),
    description,
    categoryId: category,
  };

  Article.update(data, { where: {id: data.id }}).then(() => {
    res.status(200).json({ message: "Artigo atualizada com sucesso!"});
  }).catch((error) => {
    res.status(401).json({ message: "Ocorreu um erro tente mais tarde!"});
  });
});

module.exports = router;
