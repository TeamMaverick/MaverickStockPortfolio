const db = require('../../database/index.js');
const Sequelize = require('sequelize');

const TickerNames = db.define('tickersAndNames', {
  symbol: {type : Sequelize.STRING , unique: true },
  name: Sequelize.STRING
})

module.exports = TickerNames;