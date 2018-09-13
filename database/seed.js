const db  = require('./index.js');
const model = require('../server/models/index.js');
const alpha = require('../server/alphaVantage/index.js');
const TickerNames = require('../server/models/TickerNames');
const Stock = require('../server/models/Stock');

db.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

Stock.sync()

TickerNames.sync({force: true}).then(() => {
  // Table created
  // populate ticker and symbol table
   alpha
    .getTickersAndNames()
    .then(({ data }) => {
      model.postTickersAndNames(data)
       .then(() => {
         db.close();
        //  //then seed 1 entry into stock 
        //   Stock.sync({force: true}).then(() => {
        //   // Table created
        //   TickerNames.findOne({
        //     where: {
        //       symbol: 'MSFT'
        //     }
        //   })
        //   .then(stock => {
        //     console.log(stock)
        //     Stock.create({stock_ticker : 'MSFT', company_name: stock.name, quantity : 1, price : 1})
        //      .then()
        //   })
        // })
       })
    })
    .catch((err) => {
      console.log(err);
    });
});

