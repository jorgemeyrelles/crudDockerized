const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: "node_db",
    dialect: 'postgres',
  },
);

module.exports = sequelize;
