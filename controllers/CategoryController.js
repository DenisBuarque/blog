const express = require("express");
const Category = require("../models/Category");
const slugify = require("slugify");

const router = express.Router();

router.get("/", (req, res) => {

  Category.findAll({raw: true}).then((categories) => {
    res.status(200).json({ categories });
  });
});

router.post("/store", (req, res) => {
  const { title } = req.body;

  if (title === undefined) {
    res.status(401).json({ message: "O título e obrigatório!" });
    return;
  }

  const data = {
    title,
    slug: slugify(title),
  };

  Category.create(data).then(() => {
    res.status(200).json({ message: "Categoria inserida com sucesso!"});
  }).catch((error) => {
    console.log(error);
  });
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  if(id === undefined || isNaN(id)) {
    res.status(401).json({ message: "Id inválido!"});
    return;
  }

  Category.destroy({ where: {id: id}}).then(() => {
    res.status(200).json({ message: "Categoria excluída com sucesso!"});
  }).catch((error) => {
    console.log(error);
  });
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;

  if(id === undefined || isNaN(id)) {
    res.status(401).json({ message: "Id inválido!"})
    return;
  }

  Category.findByPk(id, {raw: true}).then((category) => {
    if(category == undefined){
      res.status(401).json({ message: "Categoria não encontrada!"})
      return;
    }

    res.status(200).json({ category });
    
  }).catch((error) => {
    console.log(error);
  });
});

router.put('/update', (req, res) => {
  const { id, title } = req.body;

  if(id === undefined || isNaN(id)) {
    res.status(401).json({ message: "Id inválido!"})
    return;
  }

  if (title === undefined) {
    res.status(401).json({ message: "O título e obrigatório!" });
    return;
  }

  const data = {
    id,
    title,
    slug: slugify(title)
  }

  Category.update(data, { where: {id: data.id }}).then(() => {
    res.status(200).json({ message: "categoria atualizada com sucesso!"});
  }).catch((error) => {
    console.log(error);
  });
});

module.exports = router;
