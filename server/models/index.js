const Stock = require("./Stock.js");
const TickerNames = require("./TickerNames");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  // Adds stock ticker to database
  saveStock: function(stock, quantity = 1, price = 1, uid, change) {
    return TickerNames.findOne({
      where: {
        symbol: stock
      }
    }).then(data => {
      return Stock.create({
        stock_ticker: stock,
        company_name: data.name,
        quantity: quantity,
        price: price,
        uid: uid,
        change: change
      });
    });
  },

  // Gets stock tickers from database
  getStocks: function(sort, uid, direction = null) {
    if (direction === "true") {
      return Stock.findAll({ where: { uid: uid }, order: [[sort, "ASC"]] });
    } else {
      return Stock.findAll({ where: { uid: uid }, order: [[sort, "DESC"]] });
    }
  },

  // Changes quantity to 0
  deleteStock: function(stocklist, uid) {
    return Stock.destroy({
      where: {
        stock_ticker: stocklist,
        uid: uid
      }
    });
  },

  //get stock
  getStock: function(stockTicker) {
    return Stock.findOne({
      where: {
        stock_ticker: stockTicker
      }
    });
  },

  // update stock quantity
  updateStockQuantity: function(stock, quantity) {
    //check if we have stock
    return Stock.update(
      {
        quantity: quantity
      },
      {
        where: {
          stock_ticker: stock
        }
      }
    );
  },

  //updates stock price field in database to reflect latest price
  updateStockPrice: function(ticker, price, change) {
    return Stock.update(
      {
        price: price,
        change: change
      },
      {
        where: {
          stock_ticker: ticker
        }
      }
    );
  },

  //inserts tickers and their company names into the tickersAndNames table in the database
  postTickersAndNames: function(stockArray) {
    return TickerNames.bulkCreate(stockArray).catch(err => {
      console.log(err);
    });
  },

  //gets a ticker if it is found
  getAllTickers: function(ticker_name) {
    return TickerNames.findOne({
      where: {
        symbol: ticker_name
      }
    });
  },

  //gets a list of all tickers that may similarly match input
  getGroupTickers: function(ticker_name) {
    return TickerNames.findAll({
      limit: 10,
      where: {
        [Op.or]: [
          { symbol: { [Op.like]: ticker_name + "%" } },
          { name: { [Op.like]: ticker_name + "%" } }
        ]
      }
    });
  }
};
