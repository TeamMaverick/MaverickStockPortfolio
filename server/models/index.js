const { db } = require('../../database/index.js');

module.exports = {
  // Adds stock ticker to database
  post: function(stock, quantity = 1, price = 1, callback) {
    var params = [stock, quantity, price];
    var queryString = `INSERT INTO stock (stock_ticker, quantity, price) VALUES (?, ?, ?) on duplicate key update quantity = values(quantity), price = values(price)`;
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
    db.query(
      `SELECT stock_ticker, quantity, price FROM stock ORDER BY stock_ticker`,
      (err, stockData) => {
        if (err) {
          console.log(err);
        }
        //console.log(stockData);
        var stockTicker = [];
        stockData.forEach((stock) => {
          stockTicker.push({
            ticker: stock.stock_ticker,
            quantity: stock.quantity,
            price: stock.price
          });
        });

        callback(stockTicker);
      }
    );
  },
  // Changes quantity to 0
  put: function(stockTicker, callback) {
    var delNum = '';
    for (var i = 0; i < stockTicker.length; i++) {
      delNum += '?, ';
    }
    db.query(`DELETE FROM stock WHERE stock_ticker IN (${delNum.slice(0, delNum.length - 2)})`, stockTicker, (err, result) => {
      if (err) {
        callback(err);
      } else {
        db.query(
          `SELECT stock_ticker, quantity, price FROM stock ORDER BY stock_ticker`,
          (err, stockData) => {
            if (err) {
              callback(err);
            }
            //console.log(stockData);
            var stockTicker = [];
            stockData.forEach((stock) => {
              stockTicker.push({
                ticker: stock.stock_ticker,
                quantity: stock.quantity,
                price: stock.price
              });
            });
            
            callback(null, stockTicker);
          }
        );
      }
    });
    

  }
};
