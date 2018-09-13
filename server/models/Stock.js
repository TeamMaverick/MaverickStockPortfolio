const db = require('../../database/index.js');
const Sequelize = require('sequelize');

const Stock = db.define('stock', {
  stock_ticker: {type : Sequelize.STRING , unique: true },
  company_name: Sequelize.STRING,
  quantity : Sequelize.INTEGER,
  price : Sequelize.FLOAT(7, 2)
});


module.exports = Stock;