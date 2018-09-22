// Boilerplate code for DB
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = new Sequelize(process.env.database, process.env.dbuser, process.env.dbpassword, {
  host: process.env.host,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;
