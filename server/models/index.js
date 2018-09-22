const Stock = require('./Stock.js');
const TickerNames = require('./TickerNames');
const Transaction = require('./Transactions');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const User = require('./User');

module.exports = {
  // Adds stock ticker to database
  saveStock: function(stock, quantity = 1, price = 1, userId) {
    return TickerNames.findOne({
      where: {
        symbol: stock
      }
    })
    .then((data) => {
      return Stock.create({stock_ticker : stock, company_name: data.name, quantity : quantity, price : price, userId: userId})
    })
  },

  buyStock: function(stock, price, userId = 1, transactionType = 'Market Order') {
    return TickerNames.findOne({
      where: {
        symbol: stock
      }
    })
    .then(() => {
      console.log('@@userID',userId)
      return Transaction.create({
        user_id: userId,
        stock_ticker: stock,
        price_bought : price,
        time_bought : Date.now(),
        transaction_type: transactionType
      })
    })
    .catch((err) => {
      console.log(err)
    })
  },

  sellStock: function(stock, price = 1, userId = 1, quantity) {
    console.log('@@modelID',userId);
    return Transaction.findAll({
      where: {
        stock_ticker: stock,
        user_id: userId,
        time_sold: null,
        price_sold: null
      },
      limit: parseInt(quantity)
    })
    .then((transactions) => {
      if (transactions) {
        soldShares = transactions.map((transaction) => {
          return transaction.update({
            price_sold : price,
            time_sold : Date.now(),
          })
          .catch((err) => {
            console.log(err)
          })
        })
        return Promise.all(soldShares)
          .then((sold) => {
            return sold;
          })
      } else {
        return
      }
    })
    .catch((err) => {
      console.log(err)
    })
  },

  // Pull the portfolio History
  pullUserTransactions: function(userId = 1) {
    return Transaction.findAll({
      where: {
        user_id: userId
      }
    })
    .catch((err) => {
      console.log(err)
    })
  },

  getHoldings: function(userId = 1) {
    return Transaction.findAll({
      where: {
        user_id: userId,
        time_sold: null,
        price_sold: null,
        price_bought: {
          [Op.ne]: null
        },
        time_bought: {
          [Op.ne]: null
        }
      }
    })
    .then((data) => {
      // Group by the stock
      var stocks = {};
      data.forEach((stock) => {
        if (stocks[stock.stock_ticker]) {
          stocks[stock.stock_ticker].push(stock)
        } else {
          stocks[stock.stock_ticker] = [stock]
        }
      })
      return stocks
    })
    .catch((err) => {
      console.log(err)
    })
  },

  // Gets stock tickers from database
  getStocks: function(sort, userId) {
    if (sort === 'Alphabetical') {
      return Stock.findAll({where: {userId: userId}, order: [['stock_ticker', 'ASC']] })
    // } else if (sort === 'Total Price') {
    //   return Stock.findAll({where: {userId: userId,order: [['price', 'DESC'],['quantity', 'DESC']] }})
    // } else {
    //   return Stock.findAll({where: {userId: userId,order: [['quantity', 'DESC']] }})
    }
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
  },
  
  createUser: (username, email, uid) => {
    return User.create({ username: username, email: email, uid: uid })
    .then(() => console.log('created user'))
    .catch(err => console.log(err))
  },
  
  retrieveUser: (uid) => {
    return User.findOne({ where: {uid: uid}})
  },
  //gets a ticker if it is found
  getAllTickers: function (ticker_name) {
    return TickerNames.findOne({
      where: {
        symbol: ticker_name
      }
    })
  },
    
  //gets a list of all tickers that may similarly match input
  getGroupTickers: function (ticker_name) {
    return TickerNames.findAll(
      {
        limit: 20,
        where: { [Op.or]: 
          [
            {symbol: { [Op.like]: ticker_name +'%' }},
            {name: { [Op.like]: ticker_name +'%' }}        
          ] 
        }
      }
    );
  }
};
