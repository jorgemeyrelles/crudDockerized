const Sequelize = require('sequelize');
const db = require('../utils/database');
const User = require('./users');

const Company = db.define('company', {
  id : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  cnpj: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  inscricaoEstadual: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  }
});

Company.belongsTo(User, {
  constraint: true,
  foreignKey: 'idUser',
});

module.exports = Company;
