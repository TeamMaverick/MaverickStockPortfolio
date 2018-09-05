//SELECT one db to work with
//For SQL
// const sqlDb = require('../../db/sql').connection;
const mysql = require('mysql');
const db = require('../../database/index.js').connection;


module.exports = {
  // adds stock ticker to database
  post: function(stock, callback) {
    console.log('SAVING DATA');
    db.query(`INSERT INTO stock (stock_ticker) VALUES (${stock})`);

    callback();
  },

  get: function(callback) {
    db.query(`SELECT * FROM stock`, (err, stockData) => {
      if (err) {
        console.log(err);
      }

      callback(stockData);
    })
  }
  
};
