const Sequelize = require("sequelize");
const connection = require("../database/database");

const Categoty = connection.define('categories', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Categoty.sync({ force: true }); // Vai criar minha tabela sempre que eu executar novamente

module.exports = Categoty;

