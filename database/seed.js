const config = require('dotenv').config();

const db  = require('./index.js');
const model = require('../server/models/index.js');
const apiHelp = require('../server/apiHelper/index.js');
const TickerNames = require('../server/models/TickerNames');
const Stock = require('../server/models/Stock');

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
  apiHelp
    .getTickersAndNames()
    .then(({ data }) => {
      model.postTickersAndNames(data)
       .then(() => { db.close(); })
    })
    .catch((err) => { console.log('error in tickersandnames',err); });
});

