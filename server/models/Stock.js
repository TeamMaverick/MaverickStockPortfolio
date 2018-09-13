const Sequelize = require('sequelize');

const Stock = sequelize.define('stock', {
  stock_ticker: {type : Sequelize.STRING , unique: true },
  company_name: Sequelize.STRING,
  quantity : Sequelize.INTEGER,
  price : Sequelize.FLOAT(7, 2)
});


module.exports = Stock;