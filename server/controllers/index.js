const axios = require('axios');
const model = require('../models/index.js');

//Return requests to the client
module.exports = {
  postStockTicker: (req, res) => {
    console.log('HITTING CONTROLLER');
    model.post(req.body.stock, (err, data) => {
      if (err) {
        console.log(err);
        res.send(500);
      } else {
        res.sendStatus(201);
      }
    });
  },

  getStockTicker: function(req, res) {
    model.get((data) => {
      console.log(data);
      res.send(data);
      res.end();
    });
  },

  getStockInfo: (req, res) => {
    axios
      .get(process.env.API, {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          interval: '5min',
          apikey: process.env.API_KEY,
          symbol: req.query.STOCK
        }
      })
      .then(({ data }) => {
        returnData = {
          metaData: data['Meta Data'],
          data: []
        };
        //get Time Series (5min)
        let timeSeries = data['Time Series (5min)'];
        for (var key in timeSeries) {
          if (timeSeries.hasOwnProperty(key)) {
            var obj = timeSeries[key];
            let arrVaules = [];
            for (var prop in obj) {
              console.log(prop + ' = ' + obj[prop]);
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
  }
};
