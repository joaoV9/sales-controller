const Sequelize = require('sequelize');
const database = require("../db");
const Venda = require("./venda");

const Produto = database.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0
    },

    quantidade: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    }
})
 
Venda.hasMany(Produto, { as: "produtos" }); 
Produto.belongsTo(Venda); 

// Venda.sync({force:true});
// Produto.sync({force:true});

module.exports = Produto;