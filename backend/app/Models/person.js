const Sequelize = require('sequelize');
const db = require('../utils/database');
const User = require('./users');

const Person = db.define('people', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  }
});

Person.belongsTo(User, {
  constraint: true,
  foreignKey: 'idUser',
});

module.exports = Person;