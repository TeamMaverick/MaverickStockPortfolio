const axios = require('axios');

// call iex API and return promise
// that retrieves data containing stock details, news relating to stock, 
// and chart data for the month including that day
const getData = (ticker) => {
  // return axios.get(process.env.API_ticker, {
  //   params: {
  //     function: 'TIME_SERIES_INTRADAY',
  //     interval: '5min',
  //     apikey: process.env.API_KEY,
  //     symbol: ticker
  //   }
  // });

  // https://api.iextrading.com/1.0/stock/amzn/batch?types=quote,news,chart&range=1m
  return axios.get(
    `${process.env.API_ticker}/stock/${ticker}/batch?types=quote,news,chart&range=1y`)
};

// grabs peer stocks of given stock
const getPeers = (ticker) => {
  return axios.get(
    `${process.env.API_ticker}/stock/${ticker}/peers`
  )
}

//get the most up-to-date price from IEX API
const getCurrentPrice = (ticker) => {
  var url = `${process.env.API_ticker}/stock/${ticker}/price`;
  return axios.get(url)
}

//calls api that returns a list of ticker symbols and their company names.
//Used with db:setup to seed the database
const getTickersAndNames = () =>{
  return axios.get(`${process.env.API_ticker}/ref-data/symbols`)
  .catch((err) => (console.log(err)));
}

module.exports.getData = getData;
module.exports.getCurrentPrice = getCurrentPrice;
module.exports.getTickersAndNames = getTickersAndNames;