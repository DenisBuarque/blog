const Sequelize = require('sequelize');
const connection = require('../database/connection');

const Category = require('./Category');

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//Relationship
Category.hasMany(Article);
Article.belongsTo(Category);

//Create table database
//Article.sync({force: true});

module.exports = Article;