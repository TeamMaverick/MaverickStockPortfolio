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

module.exports.getData = getData;
