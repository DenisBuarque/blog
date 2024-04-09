const express = require("express");
const Category = require("../models/Category");
const slugify = require("slugify");

const router = express.Router();

router.get("/", (req, res) => {

  Category.findAll({raw: true}).then((categories) => {
    console.log(categories);
  });
  res.send("Lista de Categorias");
});

router.post("/store", (req, res) => {
  const { title } = req.body;

  if (title === undefined) {
    res.send("O título é obrigatório.");
    return;
  }

  const data = {
    title,
    slug: slugify(title),
  };

  Category.create(data).then(() => {
    res.send("Categoria criada com sucesso!");
  }).catch((error) => {
    console.log(error);
  });
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  if(id === undefined || isNaN(id)) {
    res.send("Id inválido");
    return;
  }

  Category.destroy({ where: {id: id}}).then(() => {
    res.send("Categoria excluída com sucesso!");
  }).catch((error) => {
    console.log(error);
  });
})

module.exports = router;
