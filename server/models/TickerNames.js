const Sequelize = require('sequelize');

const TickerNames = sequelize.define('tickernames', {
  stock_ticker: {type : Sequelize.STRING , unique: true },
  company_name: Sequelize.STRING
})

module.exports = TickerNames;