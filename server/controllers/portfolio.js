const axios = require('axios')
const moment = require('moment')

module.exports = {
  
  // Calculate the different time features for the portfolio
  getPortfolio: (transactions, time = '1d') => {
    // make an initial call for the first stock over the time period specified, to get the data set over which to chart!
    if (transactions[0]) {
      return axios.get(`https://api.iextrading.com/1.0/stock/${transactions[0].stock_ticker}/chart/${time}`)
        .then(({data}) => {
          // now with the structure, create the object bones to return
          portfolio = calculatePortfolio(data, transactions)
          console.log(portfolio);
          return portfolio
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      return
    }
  }

};

const calculatePortfolio = function(oneStockChartPoints, positions) {
  // now with the structure
  var portfolio = {}; 
  portfolio.openPositions = [];
  portfolio.realizedGL = [];
  portfolio.investedAmount = [];
  portfolio.time = [];
  var realizedGL = 0;
  portfolio.stocks = {};

  // Loop through each time period on the chart
  oneStockChartPoints.forEach((chartPoint) => {
    let time = moment(chartPoint.date + ' ' + chartPoint.minute, 'YYYYMMDD H:mm')
    var filteredPositions = []
    var openPositions = {}
    var investedAmount = 0

    // for each transaction
    positions.forEach((position) => {
      if (position.time_sold && time.isBefore(position.time_sold)) { // If position is passed completely
        realizedGL += (position.price_sold - position.price_bought) // add to Realized GL
      } else {
        filteredPositions.push(position) // if transaction is either open or not yet opened, then add it to those to continue looking at
        if (position.time_bought && time.isAfter(position.time_bought)) { // If position is not closed but is opened
          // add to list of stocks
          portfolio.stocks[position.stock_ticker] = position.stock_ticker
          // add to current open positions
          if (openPositions[position.stock_ticker]) {  
            openPositions[position.stock_ticker] += 1
          } else {
            openPositions[position.stock_ticker] = 1
          }
          // add to invested amount
          investedAmount += position.price_bought
        }
      }
    })
    // sum up these aspects for the time period
    portfolio.openPositions.push(openPositions)
    portfolio.realizedGL.push(realizedGL)
    portfolio.investedAmount.push(investedAmount)
    portfolio.time.push(time)
    positions = filteredPositions

  })

  return portfolio
}

const calculateValueOfHoldings = function() {

}