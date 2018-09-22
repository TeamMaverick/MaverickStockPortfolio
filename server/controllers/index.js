const model = require('../models/index.js');
const alpha = require('../alphaVantage/index.js');
const portfolioCalculator = require('./portfolio.js');

const admin = require('firebase-admin');
const config = require('../../config.js').firebaseCred
const db = require('../../config.js').firebaseDB
const firebase = require('firebase')


// admin.initializeApp({
//   credential: admin.credential.cert(config),
//   databaseURL: db
// });

//Return requests to the client
module.exports = {
  
  // Handles all logic needed to 'buy' a stock.
  buyStock: (req, res) => {  // HANDLE QUANTITIES OVER 1
    alpha
      .getCurrentPrice(req.body.stock)
      .then(({ data }) => {
        let buyPromises = [];
        for (var i = 0; i < req.body.quantity; i++) {
          console.log('buy', req.body.userId)
          buyPromises.push(model.buyStock(req.body.stock, data, req.body.userId, req.body.transactionType))
        }
        Promise.all(buyPromises)
          .then((data) => {
            res.send(data);
          })
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  
  sellStock: (req, res) => { // HANDLE QUANTITIES OVER 1
    alpha
      .getCurrentPrice(req.body.stock)
      .then(({ data }) => {
        model.sellStock(req.body.stock, data, req.body.userId, req.body.quantity)
          .then((data) => {
            res.send(data)
          })
          .catch((err) => {
            console.log(err)
            res.send({message: 'Failed to sell, you may not have enough shares'})
          })
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      });
  },

  history: (req, res) => {
    model.pullUserTransactions(req.query.userId)
      .then((data)=> {
        // With the data, punt to another controller file.
        portfolioCalculator.getPortfolio(data)
          .then((portfolio) => {
            res.send(portfolio)
          })
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      })
  },

  currentHoldings: (req, res) => {
    model.getHoldings(req.query.userId)
      .then((data)=> {
        // format like the old style
        var stockArray = [];
        for (stock in data) {
          let stockObject = data[stock][Object.keys(data[stock])[0]]
          stockObject.dataValues.quantity = Object.keys(data[stock]).length
          stockArray.push(stockObject)
        }
        let stockArrayWValues = stockArray.map((stock) => {
          return alpha
            .getCurrentPrice(stock.stock_ticker)
            .then(({ data }) => {
              stock.dataValues.price = data
              return stock
            })
            .catch((err) => {
              console.log(err);
            });
        })
        Promise.all(stockArrayWValues)
          .then((stocks) => {
            // console.log(stocks)
            res.send(stocks)
          })
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      })
  },
  
  // Calls function in model to post stock ticker to database
  postStockTicker: (req, res) => {
    model.saveStock(req.body.stock, req.body.quantity, req.body.price, req.body.userId)
     .then((data) => {
        res.sendStatus(201);       
     })
     .catch((err) => {
       console.log(err)
        res.sendStatus(500);       
     })
  },

  // Calls function in model to get stock tickers and quantity of stock from database
  getStockTicker: function(req, res) {
    model.getStocks(req.query.sort, req.query.userId)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      })
  },

  // gets all stocks
  getAllStocks: function(req, res) {
    model
      .getAllTickers(req.query.stock)
      .then((data) => {
        if(data===null) {
          model.getGroupTickers(req.query.stock).then( (data) => {
            var newData = []
            for(let i = 0; i<data.length; i++) {
              newData.push({id: data[i].id, label: data[i].symbol+': ' + data[i].name.split(' ').slice(0, 3).join(' ')});
            }
            res.send(newData);
          })
          .catch(err => {
            res.send(err);
            console.log(err);
          })
        } else {
          var newData = [{id: data.id, label: data.symbol+': ' + data.name.split(' ').slice(0, 3).join(' ')}]
          res.send(newData);
        }
      })
      .catch((err) => {
        res.send(err);
        console.log(err);
      });
  },

  // get stock info from alphaVantage
  // input : STOCK = ticker symbol
  getStockInfo: (req, res) => {
    alpha
      .getData(req.query.STOCK)
      .then(({ data }) => {
        if(data.Information){
          res.send(data);
        }
        else {
          returnData = {
            metaData: data['Meta Data'],
            data: []
          };
          //get Time Series (5min)
          // flatten object stucture into array for data vis
          let timeSeries = data['Time Series (5min)'];
          for (var key in timeSeries) {
            if (timeSeries.hasOwnProperty(key)) {
              var obj = timeSeries[key];
              let arrVaules = [];
              for (var prop in obj) {
                arrVaules.push(parseFloat(obj[prop]));
              }
              returnData.data.push([new Date(key).getTime()].concat(arrVaules));
            }
          }
          returnData.data.reverse();
          res.send(returnData);
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // deletes stock
  deleteStock: (req, res) => {
    const stocks = req.body.stocks;
    if (stocks === undefined) {
      res.sendStatus(500);
    } else
    {
    model.deleteStock(stocks)
     .then(() => {
        res.sendStatus(201);
     })
     .catch((err) => {
       res.send(err);
     })
    }
  },

  //gets current price from IEX
  getCurrentPrice: (req, res) => {
    alpha
      .getCurrentPrice(req.query.STOCK)
      .then(({ data }) => {
        res.send(JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  // update stock quantity
  updateStockQuantity: (req, res) => {
    let newQuantity = req.body.param.quantity;
    let stock = req.body.param.stock;
    if(newQuantity !== undefined && stock){
      model.updateStockQuantity(stock, newQuantity)
        .then((data) => {
          res.sendStatus(201);
        })
        .catch((err) => {
          res.sendStatus(500);
        })
    } else {
      res.send('Invalid - requested params missing');
    } 
  },

  //update stock price in the database
  updatePrice: (req, res) => {
    model.updateStockPrice(req.body.ticker, req.body.price)
      .then(()=> {
        res.sendStatus(201);
      })
      .catch(()=> {
        res.sendStatus(500);
      })
  },

  //used with db:setup to get a list of ticker symbols and company names from an external api
  //then populates database with ticker symbols and company names
  //only needs to be called once with db:setup  
  postTickersAndNames: (req, res) => {
    alpha
      .getTickersAndNames()
      .then(({ data }) => {
        model.postTickersAndNames(data);
        res.sendStatus(201);
      })
      .catch((err) => {
        res.send(err);
        console.log(err);
      });
  },
  //sends query to IEX API and returns quote and stats
  getTickerInfo: (req, res) => {
    alpha.getTickerInfo(req.query.term)
    .then(({data}) => {
      res.status(200).send(data)
    })
  },

  signUp: (req, res) => {
    var username = req.body.username
    var email = req.body.email
    var uid = req.body.uid
    model.createUser(username, email, uid)
    .then(data => res.status(201).send(data))
    .catch(err => console.log(err))
  },

  signIn: (req, res) => {
    model.retrieveUser(req.query.uid)
    .then(data => res.status(200).send(data))
    .catch(err => console.log(err))
  }


};
