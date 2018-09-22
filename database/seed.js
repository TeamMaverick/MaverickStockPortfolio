const config = require('dotenv').config();

const db  = require('./index.js');
const model = require('../server/models/index.js');
const alpha = require('../server/alphaVantage/index.js');
const TickerNames = require('../server/models/TickerNames');
const Stock = require('../server/models/Stock');
const Transaction = require('../server/models/Transactions');
const User = require('../server/models/User');

db.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

Stock.sync({force: true});

TickerNames.sync({force: true}).then(() => {
  // Table created
  // populate ticker and symbol table
   alpha
    .getTickersAndNames()
    .then(({ data }) => {
      model.postTickersAndNames(data)
       .then(() => {
         db.close();
       })
    })
    .catch((err) => {
      console.log(err);
    });
});

Transaction.sync({force: true});

User.sync({force: true});