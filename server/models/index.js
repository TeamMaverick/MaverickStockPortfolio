const db = require('../../database/index.js');
const Stock = require('./Stock.js');
const TickerNames = require('./TickerNames');


module.exports = {
  // Adds stock ticker to database
  saveStock: function(stock, quantity = 1, price = 1) {
    return TickerNames.findOne({
      where: {
        symbol: stock
      }
    })
    .then((data) => {
      console.log(data)
      return Stock.create({stock_ticker : stock, company_name: data.name, quantity : quantity, price : price})
    })
  },
  // Gets stock tickers from database
  getStocks: function(sort) {

    let sortArr = []
    if (sort === 'Alphabetical') {
      sortArr = ['stock_ticker', 'ASC'];
    } else if (sort === 'Total Price') {
      sort = 'price * quantity DESC';
      // sortArr = [sequelize.fn('otherfunction', sequelize.col('price'), sequelize.col('quantity')), 'DESC']
      sortArr = ['price', 'DESC'];
      sortArr.push(['quantity', 'DESC']);

    } else {
      sortArr = ['quantity', 'DESC'];
    }

    return Stock.findAll({order: [sortArr]})
    
    // var queryString = `SELECT stock_ticker, quantity, price, company_name FROM stock ORDER BY ${sort}`;
    // db.query(queryString, (err, stockData) => {
    //   if (err) {
    //     console.log(err);
    //   } else { 
    //     var stockTicker = [];
    //     stockData.forEach((stock) => {
    //       stockTicker.push({
    //         ticker: stock.stock_ticker,
    //         quantity: stock.quantity,
    //         companyName: stock.company_name,
    //         price: stock.price
    //       });
    //     });
    //     callback(stockTicker);
    //   }
    // });
  },
  // Changes quantity to 0
  deleteStock: function(stocklist, sort, callback) {
    // var delNum = '';
    // for (var i = 0; i < stocklist.length; i++) {
    //   delNum += '?, ';
    // }

    return Stock.destroy({where: {
      stock_ticker : stocklist
    }})

    // db.query(
    //   `DELETE FROM stock WHERE stock_ticker IN (${delNum.slice(0, delNum.length - 2)})`,
    //   stocklist,
    //   (err, result) => {
    //     if (err) {
    //       callback(err);
    //     } else {
    //       this.get(sort, callback);
    //     }
    //   }
    // );
  },

  //get stock
  getStock: function(stockTicker, callback) {

    return Stock.findOne({where: {
      stock_ticker : stockTicker
    }})

    // db.query('select * from stock where stock_ticker = ?', [stockTicker], (err, data) => {
    //   if(err){
    //     console.log(err);
    //     callback(err);
    //   }
    //   callback(null, data);
    // })
  },

  // update stock quantity
  updateStockQuantity: function (stock, quantity, callback) {
    //check if we have stock
    console.log('updating')
    return Stock.update({
      quantity : quantity
    }, {
      where: {
        stock_ticker : stock
      }
    })

    // this.getStock(stock, (err, data) => {
    //   if(err) {
    //     console.log(err);
    //     callback(err);
    //   }
    //   db.query('update stock set quantity = ? where stock_ticker = ?', [quantity, stock], (err, results) => {
    //     if(err) {
    //       console.log(err);
    //       callback(err);
    //     }
    //     callback(null, results);
    //   })
    // })
    
  },

  //updates stock price field in database to reflect latest price
  updateStockPrice: function(ticker, price, callback) {
    var params = [price, ticker];

    return Stock.update({
      price : price
    }, {
      where: {
        stock_ticker : ticker
      }
    })

    // var queryString = `UPDATE stock SET price = ? WHERE stock_ticker = ?`;
    // db.query(queryString, params, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     callback(null, data);
    //   }
    // });

  },

  //inserts tickers and their company names into the tickersAndNames table in the database
  postTickersAndNames: function(stockArray) {
    return TickerNames.bulkCreate(stockArray)
     .then(() => {
       console.log('Created');
     })
     .catch((err) => {
       console.log(err);
     })
  }
};
