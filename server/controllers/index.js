const axios = require('axios');

//Return requests to the client
module.exports = {
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
          console.log(new Date(key).getTime());
          if (timeSeries.hasOwnProperty(key)) {
            var obj = timeSeries[key];
            let arrVaules = [];
            for (var prop in obj) {
              // TODO: tentative change
              // console.log(prop + ' = ' + obj[prop]);
              arrVaules.push(parseFloat(obj[prop]));
            }
            // converts date to unix time
            returnData.data.push([new Date(key).getTime()].concat(arrVaules));
          }
        }
        // reverse array because highcharts wants date in ascending order
        returnData.data.reverse();
        res.send(returnData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
