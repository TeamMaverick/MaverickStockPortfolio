//SELECT one db to work with
//For SQL
// const sqlDb = require('../../db/sql').connection;
const mysql = require('mysql');
const db = require('../../config.js');


module.exports = {
  // adds stock ticker to database
  post: function(stock) {
    console.log("SAVING STOCK: ", stock);
    var params = stock;
    db.query(`INSERT INTO stock (stock_ticker) VALUES (?)`, params);

  },

  get: function(callback) {
    db.query(`SELECT * FROM stock`, (err, stockData) => {
      if (err) {
        console.log(err);
      }
      var stockTicker = [];
      stockData.forEach((stock) => {stockTicker.push(stock.stock_ticker)});
      
      callback(stockTicker);
    })
  }
  
};
