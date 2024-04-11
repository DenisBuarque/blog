const express = require('express');
const bodyParser = require('body-parser');

const Category = require('./models/Category');
const Article = require('./models/Article');

const CategoryController = require('./controllers/CategoryController');
const ArticleController = require('./controllers/ArticleController');

const connection = require('./database/connection');
connection.authenticate().then(() => {
    console.log('Conectou ao banco MySQL');
}).catch((error) => {
    console.log(error);
});

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/categories', CategoryController);
app.use('/articles', ArticleController);

app.use('/', (req, res) => {
    Article.findAll({ raw: true }).then((articles) => {
        res.status(200).json({ articles });
    });
});

app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000.");
})