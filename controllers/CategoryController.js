const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Lista de Categorias");
});

router.post("/store", (req, res) => {
  const { title, slug } = req.body;

  const data = {
    title,
    slug,
  };

  Category.create(data);

  res.send("Categoria criada com sucesso!");
});

module.exports = router;
