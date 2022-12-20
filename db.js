const Sequelize = require("sequelize");

const conexao = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  })
 
module.exports = conexao;