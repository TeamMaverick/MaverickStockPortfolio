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
      sortArr = ['price', 'DESC'];
      sortArr.push(['quantity', 'DESC']);

    } else {
      sortArr = ['quantity', 'DESC'];
    }

    return Stock.findAll({order: [sortArr]})
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
       console.log('Created');
     })
     .catch((err) => {
       console.log(err);
     })
  }
};
