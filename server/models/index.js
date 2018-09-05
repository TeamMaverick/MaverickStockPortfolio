//SELECT one db to work with
//For SQL
// const sqlDb = require('../../db/sql').connection;
const mysql = require('mysql');
const db = require('../../config.js').dbConfig;

var connection = mysql.createConnection(db);
connection.connect();

module.exports = {
  // adds stock ticker to database
  post: function(stock, callback) {
    console.log("SAVING STOCK: ", stock);
    var params = stock;
    connection.query(`INSERT INTO stock (stock_ticker) VALUES (?)`, params, (err, data)=> {
      if(err) {
        console.log(err);
      } else {
        callback(null,data);
      }
    });
  },

  get: function(callback) {
    connection.query(`SELECT * FROM stock`, (err, stockData) => {
      if (err) {
        console.log(err);
      }
      var stockTicker = [];
      stockData.forEach((stock) => {stockTicker.push(stock.stock_ticker)});
      
      callback(stockTicker);
    })
  }
  
};
