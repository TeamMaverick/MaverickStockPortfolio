const model = require('../models/index.js');
const alpha = require('../alphaVantage/index.js');
const axios = require('axios');

//Return requests to the client
module.exports = {
  // Calls function in model to post stock ticker to database
  postStockTicker: (req, res) => {
    model.saveStock(
      req.body.stock, 
      req.body.quantity, 
      req.body.price, 
      req.body.uid, 
      req.body.change, 
      req.body.ytdChange, 
      req.body.latestVolume)
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
    model.getStocks(req.query.sort, req.query.uid)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      })
  },

  // get stock info from alphaVantage
  // input : STOCK = ticker symbol
  getStockInfo: (req, res) => {
    alpha
      .getData(req.query.STOCK)
      .then(({data}) => {
        returnData = {
          quote: data.quote,
          data: [],
          news: data.news,
          peers: data.peers
        };
        // get stock info with quote, chart, and news
        // flatten object stucture into array for StockChart
        let timeSeries = data.chart;
        for (let point of data.chart) {
          // CODE FOR WHEN USING 1d FOR API CALL
          /* 
          let year = point.date.substring(0,4);
          let month = point.date.substring(4,6);
          let day = point.date.substring(6,8);
          let hour = point.minute.substring(0,2);
          let minute = point.minute.substring(3,5);
          let date = new Date(year, month-1, day, hour, minute);
          */

          let date = new Date(point.date);
          let arrVaules = [date.getTime(), point.open, point.high, 
                              point.low, point.close, point.volume];
          returnData.data.push(arrVaules);
        }
        res.send(returnData);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getPeersChange: (req, res) => {
    alpha
      .getPeersChange(req.query.peers)
      .then(({data}) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      })
  },

  // deletes stock
  deleteStock: (req, res) => {
    const stocks = req.body.stocks;
    const uid = req.body.uid;
    if (stocks === undefined) {
      res.sendStatus(500);
    } else
    {
    model.deleteStock(stocks, uid)
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
    if(stock){
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
    model.updateStockPrice(req.body.ticker, 
      req.body.price, 
      req.body.change, 
      req.body.ytdChange, 
      req.body.latestVolume)
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
  //handles input ticker search autocomplete
  getAllTickers: (req, res) => {
    model
      .getAllTickers(req.query.stock_ticker)
      .then((data) => {
        if(data===null) {
          model.getGroupTickers(req.query.stock_ticker).then( (data) => {
            var newData = []
            for(let i = 0; i<data.length; i++) {
              newData.push({id: data[i].id, label: data[i].symbol+': ' + data[i].name});
            }
            res.send(newData);
          })
          .catch(err => {
            res.send(err);
            console.log(err);
          })
        } else {
          var newData = [{id: data.id, label: data.symbol+': ' + data.name}]
          res.send(newData);
        }
      })
      .catch((err) => {
        res.send(err);
        console.log(err);
      });
  },
  getBannerInfo: (req, res) => {
    alpha.getAllBannerInfo()
      .then((result) => res.send(result))
      .catch((e) => console.log(e))
    // res.send(alpha.getAllBannerInfo())
  }
};
