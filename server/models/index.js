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
      return Stock.create({stock_ticker : stock, company_name: data.name, quantity : quantity, price : price})
    })
  },
  // Gets stock tickers from database
  getStocks: function(sort) {
    if (sort === 'Alphabetical') {
      return Stock.findAll({order: [['stock_ticker', 'ASC']]})
    } else if (sort === 'Total Price') {
      return Stock.findAll({order: [['price', 'DESC'],['quantity', 'DESC']]})
    } else {
      return Stock.findAll({order: [['quantity', 'DESC']]})
    }
  },

  getAllStocks: function() {
    return TickerNames.findAll()
  },

  // Changes quantity to 0
  deleteStock: function(stocklist) {
    return Stock.destroy({where: {
      stock_ticker : stocklist
    }})
  },

  //get stock
  getStock: function(stockTicker) {
    return Stock.findOne({where: {
      stock_ticker : stockTicker
    }})
  },

  // update stock quantity
  updateStockQuantity: function (stock, quantity) {
    //check if we have stock
    return Stock.update({
      quantity : quantity
    }, {
      where: {
        stock_ticker : stock
      }
    })
  },

  //updates stock price field in database to reflect latest price
  updateStockPrice: function(ticker, price) {
    return Stock.update({
      price : price
    }, {
      where: {
        stock_ticker : ticker
      }
    })
  },

  //inserts tickers and their company names into the tickersAndNames table in the database
  postTickersAndNames: function(stockArray) {
    return TickerNames.bulkCreate(stockArray)
     .then(() => {
      //  console.log('Created');
     })
     .catch((err) => {
       console.log(err);
     })
  }
};
