const model = require('../models/index.js');
const alpha = require('../alphaVantage/index.js');

//Return requests to the client
module.exports = {
  // Calls function in model to post stock ticker to database
  postStockTicker: (req, res) => {
    model.saveStock(req.body.stock, req.body.quantity, req.body.price)
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
    model.getStocks(req.query.sort)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      })
  },

  // gets all stocks
  getAllStocks: function(req, res) {
    model.getAllStocks()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send(err)
    })
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
    if(newQuantity && stock){
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
  }
};
