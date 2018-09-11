const axios = require('axios');
const model = require('../models/index.js');
const alpha = require('../alphaVantage/index.js');

//Return requests to the client
module.exports = {
  // Calls function in model to post stock ticker to database
  postStockTicker: (req, res) => {
    model.post(req.body.stock, req.body.quantity, req.body.price, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  },
  // Calls function in model to get stock tickers and quantity of stock from database
  getStockTicker: function(req, res) {
    model.get((data) => {
      res.send(data);
      res.end();
    });
  },

  // get stock info from alphaVantage
  // input : STOCK = ticker symbol
  getStockInfo: (req, res) => {
    alpha
      .getData(req.query.STOCK)
      .then(({ data }) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // deletes
  resetStockQuantity: (req, res) => {
    const stocks = req.body.stocks;
    if (stocks === undefined) {
      res.sendStatus(500);
    }
    
    model.put(stocks, (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(result);
      } 
    })

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
      });
  },

  //updates all stock prices in the database
  updatePrice: (req, res) => {
    model.updateStockPrice(req.body.ticker, req.body.price, (err, data) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.sendStatus(201);
      }
    })
  },


  //gets complete list of tickers and names and stores them in the database
  postTickersAndNames: (req, res) => {
    console.log('inside controller')
    alpha
    .getTickersAndNames()
    .then(({data}) => {
      console.log(data);
      model.postTickersAndNames(data);
    })
    .then(() => res.sendStatus(201));
  }

};
