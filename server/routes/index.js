const router = require('express').Router();
const stockController = require('../controllers/index.js');

//Route different requests to different endpoints
router.get('/stockInfo', stockController.getStockInfo)
// router.get('/genres', movieController.getGenres)
// router.post('/save', movieController.saveMovie)
// router.delete('/delete', movieController.deleteMovie)
// router.get('/favorites', movieController.getMovies)

module.exports = router;