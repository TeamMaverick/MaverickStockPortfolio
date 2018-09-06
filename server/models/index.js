const { db } = require('../../database/index.js');

module.exports = {
  // Adds stock ticker to database
  post: function(stock, quantity, price, callback) {
    var params = [stock, quantity || 1, price || 1];
    var queryString = `INSERT INTO stock (stock_ticker, quantity, price) VALUES (?, ?, ?)`;
    db.query(queryString, params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, data);
      }
    });
  },
  // Gets stock tickers from database
  get: function(callback) {
    db.query(`SELECT stock_ticker, quantity FROM stock ORDER BY stock_ticker`, (err, stockData) => {
      if (err) {
        console.log(err);
      }
      //console.log(stockData);
      var stockTicker = [];
      stockData.forEach((stock) => {
        stockTicker.push({ ticker: stock.stock_ticker, quantity: stock.quantity });
      });

      callback(stockTicker);
    });
  }
};
