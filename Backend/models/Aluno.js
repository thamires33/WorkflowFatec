const db = require('./db');

const Aluno = db.sequelize.define('aluno', {
  id_aluno: {
    type: db.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  ra: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  nome: {
    type: db.Sequelize.STRING,
    allowNull: true
  },
  email_institucional: {
    type: db.Sequelize.STRING,
    allowNull: true
  },
  senha: {
    type: db.Sequelize.STRING,
    allowNull: true
  },
  email_recuperacao: {
    type: db.Sequelize.STRING,
    allowNull: true
  }
}, {
  freezeTableName: true // impede que o Sequelize pluralize o nome da tabela
});

// ⚠️ Atenção: use apenas 1 vez no início do projeto para criar a tabela
// Aluno.sync({ force: true });

module.exports = Aluno;
