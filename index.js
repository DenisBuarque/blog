const express = require('express');
const bodyParser = require('body-parser');

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

app.use('/', (req, res) => {
    res.send('Bem-vindo ao Blog Guia Press');
});

app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000.");
})