const Sequelize = require('sequelize');
const db = require('../utils/database');
const Person = require('./person');

const Contact = db.define('contacts', {
  id : {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  }
});

Contact.belongsTo(Person, {
  constraint: true,
  foreignKey: 'idPerson',
});

module.exports = Contact;
