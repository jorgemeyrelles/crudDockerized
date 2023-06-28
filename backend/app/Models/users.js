const Sequelize = require('sequelize');
const db = require('../utils/database');

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // phone: {
  //   type: Sequelize.STRING,
  //   allowNull: true,
  // },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = User;
