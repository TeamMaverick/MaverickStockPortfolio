var expect = require('chai').expect;
var axios = require('axios');

const config = require('dotenv').config();

var app = require('../server/maverick.js');
var Stock = require('../server/models/Stock.js');

describe('', function() {

  var server;

  before(function() {
    server = app.listen(3000, function() {
      console.log('App is listening on 3000');
    })
    return Stock.sync({force: true})
  });
 

  after(function() {
    server.close();
  });

  describe('Stock creation', function () {

    it('Should create a new stock in stock table', function(done) {
    
      axios.post('http://127.0.0.1:3000/api/stock', {
        stock: 'SYF',
        quantity: '1',
        price: '100'
      })
        .then(({data}) => {
          expect(data).to.equal('Created');
        })
        .then(done, done);
    });

    it('Should return the newly created stock', function(done) {
      Stock.findOne({where: {
        stock_ticker : 'SYF'
      }})
      .then((data) => {
        expect(data.stock_ticker).to.equal('SYF');
      })
      .then(done, done);
    });
  });

  describe('Stock updates', function () {

    it('Should update the stock quantity in stock table', function(done) {
      axios.post('http://127.0.0.1:3000/api/updateQuantity', {
        param: {
          quantity: '10',
          stock: 'SYF'
        }
      })
        .then(({data}) => {
          expect(data).to.equal('Created');
        })
        .then(done, done);
    });

    it('Should return the updated quantity', function(done) {
      Stock.findOne({where: {
        stock_ticker : 'SYF'
      }})
      .then((data) => {
        expect(data.quantity).to.equal(10);
      })
      .then(done, done);
    });

    it('Should update the stock price in stock table', function(done) {
      axios.post('http://127.0.0.1:3000/api/currentStockPrice', {
          ticker: 'SYF',
          price: '200'
      })
        .then(({data}) => {
          expect(data).to.equal('Created');
        })
        .then(done, done);
    });

    it('Should return the updated price', function(done) {
      Stock.findOne({where: {
        stock_ticker : 'SYF'
      }})
      .then((data) => {
        expect(data.price).to.equal(200);
      })
      .then(done, done);
    });

  });

});
