const axios = require('axios');

// call alphavantage API and return promise
const getData = (ticker) => {
  return axios.get(process.env.API, {
    params: {
      function: 'TIME_SERIES_INTRADAY',
      interval: '5min',
      apikey: process.env.API_KEY,
      symbol: ticker
    }
  });
};

const getCurrentPrice = (ticker) => {
  console.log('inside alphavantage', ticker);
  var url = `https://api.iextrading.com/1.0/stock/${ticker}/price`;
  console.log(url);
  return axios.get(url)
}

module.exports.getData = getData;
module.exports.getCurrentPrice = getCurrentPrice;