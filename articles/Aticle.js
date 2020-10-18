const Sequelize = require("sequelize");
const connection = require("../database/database");
const Categoty = require("../categories/Category");

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

// RELACIONAMENTO DE TABELAS NO SEQUELIZE

Categoty.hasMany(Article); // Uma Categoria tem muitos artigos
Article.belongsTo(Categoty); // UM artigo pertence a uma categoria

// Article.sync({ force: true }); // Vai criar minha tabela sempre que eu executar novamente

module.exports = Article;