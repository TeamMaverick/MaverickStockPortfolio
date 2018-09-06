const router = require('express').Router();
const stockController = require('../controllers/index.js');

//Route different requests to different endpoints
router.get('/stockInfo', stockController.getStockInfo)

// Routes user input Post request to controller
router.post('/stock', stockController.postStockTicker);

// Routes get request for stock tickers to controller
router.get('/stocks', stockController.getStockTicker);

module.exports = router;