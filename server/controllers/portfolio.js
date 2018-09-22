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
          console.log(portfolio)
          return calculateValueOfHoldings(portfolio, time)
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
  var portfolio = {}
  portfolio.openPositions = []
  portfolio.realizedGL = []
  portfolio.investedAmount = []
  portfolio.time = []
  var realizedGL = 0
  portfolio.stocks = {}
  portfolio.valueOfHoldings = []
  portfolio.unrealizedGL = []

  // Loop through each time period on the chart
  oneStockChartPoints.forEach((chartPoint) => {
    let time = moment(chartPoint.date + ' ' + chartPoint.minute, 'YYYYMMDD H:mm').add(1, 'days');
    var filteredPositions = []
    var openPositions = {}
    var investedAmount = 0

    // for each transaction
    positions.forEach((position) => {
      if (position.time_sold && time.isAfter(position.time_sold)) { // If position is passed completely
        realizedGL += (position.price_sold - position.price_bought) // add to Realized GL
      } else {
        filteredPositions.push(position) // if transaction is either open or not yet opened, then add it to those to continue looking at
        if (position.time_bought && time.isAfter(position.time_bought)) { // If position is not closed but is opened
          // add to list of stocks
          portfolio.stocks[position.stock_ticker] = position.stock_ticker
          // add to current open positions
          if (openPositions[position.stock_ticker]) {  
            openPositions[position.stock_ticker].push(position.price_bought)
          } else {
            openPositions[position.stock_ticker] = [position.price_bought]
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

const calculateValueOfHoldings = function(portfolio, time) {

  if (portfolio.stocks) {

    // gather all API data
    var stockPriceCharts = Object.keys(portfolio.stocks).map((stock) => {
      return axios.get(`https://api.iextrading.com/1.0/stock/${stock}/chart/${time}`)
        .then(({data}) => {
          return {
            stock: stock,
            data: data
          }
        })
    })
    return Promise.all(stockPriceCharts)
      .then((stockPriceArray) => {

        // Convert to an object
        var stockPriceObject = {}
        stockPriceArray.forEach((stock) => {
          stockPriceObject[stock.stock] = stock.data
        })

        // loop over time
        for (t = 0; t < portfolio.time.length; t++) {
          let openPoss = portfolio.openPositions[t]
          let value = 0
          let unrealizedGLAtTheMoment = 0
          for (stock in openPoss) {
            let openHoldingsForThisStock = openPoss[stock]
            let currentValueOfThisStock = stockPriceObject[stock][t]
            let glOfStock = openHoldingsForThisStock.reduce((acc, stockPricePaid) => {
              // add the diff to the acc
              if (currentValueOfThisStock['high'] !== -1) {
                return acc + (currentValueOfThisStock['high'] - stockPricePaid)
              } else {
                return acc
              }
            }, 0)
            unrealizedGLAtTheMoment += glOfStock
            let adj = 0;
            while (stockPriceObject[stock][t + adj] && stockPriceObject[stock][t + adj]['high'] === -1 && (t + adj + 1) < portfolio.time.length) {
              adj++
            }
            if (stockPriceObject[stock][t + adj]) {
              value += stockPriceObject[stock][t + adj] && openPoss[stock].length * stockPriceObject[stock][t + adj]['high']
            } else {
              value += 0;
            }
          }
          portfolio.valueOfHoldings.push(value)
          if (unrealizedGLAtTheMoment !== 0) {
            portfolio.unrealizedGL.push(unrealizedGLAtTheMoment)
          } else {
            portfolio.unrealizedGL.push(portfolio.unrealizedGL[portfolio.unrealizedGL.length - 1])
          }
        }

        return portfolio
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    return portfolio
  }

}