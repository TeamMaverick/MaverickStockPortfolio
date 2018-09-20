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
  // console.log('API_ticker', process.env.API_ticker);
  // console.log('ticker', ticker);
  var url = `${process.env.API_ticker}/1.0/stock/${ticker}/price`;
  return axios.get(url)
}

//calls api that returns a list of ticker symbols and their company names.
//Used with db:setup to seed the database
const getTickersAndNames = () =>{
  return axios.get(`${process.env.API_ticker}/1.0/ref-data/symbols`)
  .catch((err) => (console.log(err)));
}

const getTickerInfo = (ticker) => {
  var url = `${process.env.API_ticker}/1.0/stock/${ticker}/batch?types=quote,stats,logo`
  return axios.get(url)
}

module.exports.getData = getData;
module.exports.getCurrentPrice = getCurrentPrice;
module.exports.getTickersAndNames = getTickersAndNames;
module.exports.getTickerInfo = getTickerInfo;