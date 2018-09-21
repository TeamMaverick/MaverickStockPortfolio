const Stock = require('./Stock.js');
const TickerNames = require('./TickerNames');
const Transaction = require('./Transactions');
const User = require('./User')

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

  buyStock: function(stock, price, userId = 1, transactionType = 'Market Order') {
    return TickerNames.findOne({
      where: {
        symbol: stock
      }
    })
    .then(() => {
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
    console.log(quantity);
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
  pullUserTransactions: function(userId) {
    return Transaction.findAll({
      where: {
        user_id: userId
      }
    })
    .catch((err) => {
      console.log(err)
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
       console.log('Created');
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
  }


};
