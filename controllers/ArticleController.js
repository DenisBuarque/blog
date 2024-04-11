const express = require("express");
const router = express.Router();

const slugify = require('slugify');

const Article = require("../models/Article");

router.get("/", (req, res) => {
  Article.findAll({ raw: true })
    .then((articles) => {
      res.status(200).json({ articles });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post('/store', (req, res) => {
    const { title, description, category } = req.body;

    if(title === undefined) {
        res.send("Digite o título do artigo.");
        return;
    }

    if(description === undefined) {
        res.send("Digite a descrição do artigo.");
        return;
    }

    if(category === undefined) {
        res.send("Selecione uma categoria.");
        return;
    }

    const data = {
        title, 
        slug: slugify(title),
        description,
        categoryId: category
    }

    Article.create(data).then(() => {
        res.status(200).json({ message: "Artigo criado com sucesso."});
    }).catch((error) => {
        console.log(error);
    });
});

module.exports = router;
