const router = require('express').Router();
const stockController = require('../controllers/index.js');

// Get stock info from aplhaVantage
router.get('/stockInfo', stockController.getStockInfo);

//get current stock price from IEX
router.get('/currentStockPrice', stockController.getCurrentPrice);

//updates current stock price from IEX to the database
router.post('/currentStockPrice', stockController.updatePrice);

// post stock
router.post('/stock', stockController.postStockTicker);

// get stock(s)
router.get('/stock', stockController.getStockTicker);

//get all stocks
router.get('/allStocks', stockController.getAllStocks);

// deletes stock
router.delete('/deleteStock', stockController.deleteStock);

// update stock quantity
router.post('/updateQuantity', stockController.updateStockQuantity);

//posts tickers and their respective names to the database
//only to be called once through db:setup to populate the database in the first place
//never called by client
router.post('/tickersAndNames', stockController.postTickersAndNames);

// Call a buy of the stock
router.post('/buy', stockController.buyStock);

// Call a sell of the stock
router.post('/sell', stockController.sellStock);

// Retrieve the portfolio history (should contain multiple series)
router.get('/portfolio', stockController.history);

router.get('/holdings', stockController.currentHoldings); 

// Query API for ticker info
router.get('/search', stockController.getTickerInfo);

// Add user info to database with Firebase generated uid
router.post('/signup', stockController.signUp)

// Retrieve user from database
router.get('/signin', stockController.signIn)


module.exports = router;
