const router = require('express').Router();
const stockController = require('../controllers/index.js');

// Get stock info from aplhaVantage
router.get('/stockInfo', stockController.getStockInfo);

//get current stock price from IEX
router.get('/currentStockPrice', stockController.getCurrentPrice);

// post stock
router.post('/stock', stockController.postStockTicker);

// get stock(s)
router.get('/stock', stockController.getStockTicker);

// deletes stock
router.put('/resetQuantity', (data) => {stockController.resetStockQuantity(data)});
module.exports = router;