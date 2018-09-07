const { db } = require('../../database/index.js');

module.exports = {
  // Adds stock ticker to database
  post: function(stock, quantity = 1, price = 1, callback) {
    var params = [stock, quantity, price];
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
  },

  //get stock
  getStock: function(stockTicker, callback) {
    db.query('select * from stock where stock_ticker = ?', [stockTicker], (err, data) => {
      if(err){
        console.log(err);
        callback(err);
      }
      callback(null, data);
    })
  },

  // update stock quantity
  updateQuantity: function (stock, quantity, callback) {
    //check if we have stock
    this.getStock(stock, (err, data) => {
      if(err) {
        console.log(err);
        callback(err);
      }
      db.query('update stock set quantity = ? where stock_ticker = ?', [quantity, stock], (err, results) => {
        if(err) {
          console.log(err);
          callback(err);
        }
        callback(null, results);
      })
    })
    
  },

  //updates stock price field in database to reflect latest price
  updateStockPrice: function(ticker, price, callback) {
    var params = [price, ticker];
    console.log('ticker is', ticker);
    var queryString = `UPDATE stock SET price = ? WHERE stock_ticker = ?`;
    db.query(queryString, params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, data);
      }
    });
  }
};
