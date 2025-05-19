const Sequelize = require('sequelize');
//Conexão com o banco de dados
const sequelize = new Sequelize('workflow_db', 'root', 'root', {
host: "localhost",
port: "3306",
dialect: 'mysql'
});
//Vamos exportar as variáveis
module.exports = {
Sequelize: Sequelize,
sequelize: sequelize
}