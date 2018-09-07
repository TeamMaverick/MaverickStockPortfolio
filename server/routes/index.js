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

// deletes stock
router.put('/resetQuantity', stockController.resetStockQuantity);
module.exports = router;