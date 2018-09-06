const { db } = require('../../database/index.js');

module.exports = {
  // Adds stock ticker to database
  post: function(stock, callback) {
    console.log('SAVING STOCK: ', stock);
    var params = stock;
    db.query(`INSERT INTO stock (stock_ticker) VALUES (?)`, params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, data);
      }
    });
  },
  // Gets stock tickers from database
  get: function(callback) {
    db.query(`SELECT * FROM stock`, (err, stockData) => {
      if (err) {
        console.log(err);
      }
      var stockTicker = [];
      stockData.forEach((stock) => {
        stockTicker.push(stock.stock_ticker);
      });

      callback(stockTicker);
    });
  }
};
