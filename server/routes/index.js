const router = require('express').Router();
const stockController = require('../controllers/index.js');

//Route different requests to different endpoints
router.get('/stockInfo', stockController.getStockInfo)
// router.get('/genres', movieController.getGenres)
// router.post('/save', movieController.saveMovie)
// router.delete('/delete', movieController.deleteMovie)
// router.get('/favorites', movieController.getMovies)

router.post('/stocks', stockController.post);

router.get('/stocks', function(req, res) {
  controller.get((stockData) => {
    res.send(stockData);
    res.end();
  });
})
module.exports = router;