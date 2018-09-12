const { db } = require('../../database/index.js');

module.exports = {
  // Adds stock ticker to database
  post: function(stock, quantity = 1, price = 1, callback) {
    var companyNameQuery = 'SELECT company_name FROM tickersAndNames WHERE stock_ticker = ?';
    db.query(companyNameQuery, stock, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        var insertQuery = `INSERT INTO stock (stock_ticker, company_name, quantity, price) VALUES (?, ?, ?, ?)`;
        var insertParams = [stock, data[0].company_name, quantity, price];
        db.query(insertQuery, insertParams, (err, insertData) => {
          if (err) {
            console.log(err);
          } else {
            callback(null, insertData);
          }
        });
      }
    });
  },
  // Gets stock tickers from database
  get: function(sort, callback) {
    if (sort === 'Alphabetical') {
      sort = 'stock_ticker';
    } else if (sort === 'Total Price') {
      sort = 'price * quantity DESC';
    } else {
      sort = 'quantity DESC';
    }
    var queryString = `SELECT stock_ticker, quantity, price FROM stock ORDER BY ${sort}`;
    db.query(queryString, (err, stockData) => {
      if (err) {
        console.log(err);
      } else {
        var stockTicker = [];
        stockData.forEach((stock) => {
          stockTicker.push({
            ticker: stock.stock_ticker,
            quantity: stock.quantity,
            companyName: stock.company_name,
            price: stock.price
          });
        });
        callback(stockTicker);
      }
    });
  },
  // Changes quantity to 0
  put: function(stockTicker, sort, callback) {
    var delNum = '';
    for (var i = 0; i < stockTicker.length; i++) {
      delNum += '?, ';
    }
    db.query(
      `DELETE FROM stock WHERE stock_ticker IN (${delNum.slice(0, delNum.length - 2)})`,
      stockTicker,
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          this.get(sort, callback);
          // db.query(
          //   `SELECT stock_ticker, quantity, price FROM stock ORDER BY stock_ticker`,
          //   (err, stockData) => {
          //     if (err) {
          //       callback(err);
          //     }
          //     //console.log(stockData);
          //     var stockTicker = [];
          //     stockData.forEach((stock) => {
          //       stockTicker.push({
          //         ticker: stock.stock_ticker,
          //         quantity: stock.quantity,
          //         price: stock.price
          //       });
          //     });
          //     callback(null, stockTicker);
          //   }
          // );
        }
      }
    );
  },

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
  },

  //inserts tickers and their company names into the tickersAndNames table in the database
  postTickersAndNames: function(stockArray) {
    stockArray.forEach((stock) => {
      const params = [stock.symbol, stock.name];
      const insertQuery = `INSERT INTO tickersAndNames (stock_ticker, company_name) VALUES (?, ?)`;
      db.query(insertQuery, params, (err) => {
        if (err) {
          console.log(err);
        }
      })
    })
  }
};
