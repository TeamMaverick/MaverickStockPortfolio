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

//get the most up-to-date price from IEX API
const getCurrentPrice = (ticker) => {
  var url = `https://api.iextrading.com/1.0/stock/${ticker}/price`;
  console.log(url);
  return axios.get(url)
}

const getTickersAndNames = () =>{
  return axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
  .catch((err) => (console.log(err)));
}

module.exports.getData = getData;
module.exports.getCurrentPrice = getCurrentPrice;
module.exports.getTickersAndNames = getTickersAndNames;