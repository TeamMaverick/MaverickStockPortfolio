const axios = require('axios');

// call iex API and return promise
// that retrieves data containing stock details, news relating to stock, 
// and chart data for the month including that day
const getData = (ticker) => {
  // https://api.iextrading.com/1.0/stock/amzn/batch?types=quote,news,chart&range=1m
  return axios
    .get(`${process.env.API_ticker}/stock/${ticker}/batch?types=quote,news,chart,peers&range=1y`)
};

// grabs peer stocks' quotes
const getPeersChange = (peers) => {
  console.log("PEERS", peers)
  return axios
    .get(`${process.env.API_ticker}/stock/market/batch?symbols=${peers}&types=quote`)
};

//get the most up-to-date price from IEX API
const getCurrentPrice = (ticker) => {
  var url = `${process.env.API_ticker}/stock/${ticker}/batch?types=quote`;
  return axios.get(url)
}

//calls api that returns a list of ticker symbols and their company names.
//Used with db:setup to seed the database
const getTickersAndNames = () =>{
  return axios.get(`${process.env.API_ticker}/ref-data/symbols`)
  .catch((err) => (console.log(err)));
}

const getAllBannerInfo = () => {
  var final = []
  return axios.get('https://api.iextrading.com/1.0/stock/market/list/mostactive')
    .then((data) => {
      data.data.forEach(dat => final.push(dat))
    })
    .then(() => {
      return axios.get('https://api.iextrading.com/1.0/stock/market/list/gainers')
        .then((data) => data.data.forEach(dat => final.push(dat)))
        .then(() => {
          return axios.get('https://api.iextrading.com/1.0/stock/market/list/losers')
            .then((data) => {
              data.data.forEach(dat => final.push(dat))
              return final
            })
            .catch((err) => console.error(err))
        })
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
  }
  

module.exports.getData = getData;
module.exports.getCurrentPrice = getCurrentPrice;
module.exports.getTickersAndNames = getTickersAndNames;
module.exports.getPeersChange = getPeersChange;
module.exports.getAllBannerInfo = getAllBannerInfo;
