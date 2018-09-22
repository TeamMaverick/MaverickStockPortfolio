const db = require('../../database/index.js');
const Sequelize = require('sequelize');

const Transaction = db.define('transactions', {
  user_id: Sequelize.STRING,
  stock_ticker: Sequelize.STRING,
  price_bought : Sequelize.FLOAT(7, 2),
  time_bought : Sequelize.DATE,
  price_sold : Sequelize.FLOAT(7, 2),
  time_sold : Sequelize.DATE,
  transaction_type: Sequelize.STRING,
});


module.exports = Transaction;