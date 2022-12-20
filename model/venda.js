const Sequelize = require('sequelize');
const database = require("../db");
 
const Venda = database.define('venda', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantidadeProdutos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    totalVenda: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    }
})
 
// Venda.hasMany(Produto); 
// Produto.belongsTo(Venda, { foreignKey: "venda_id", as: "venda" }); 

// Venda.sync({force:true});
module.exports = Venda;