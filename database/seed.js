const db  = require('./index.js');
const model = require('../models/index.js');
const alpha = require('../alphaVantage/index.js');

db.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

alpha
.getTickersAndNames()
.then(({ data }) => {
  model.postTickersAndNames(data);
})
.catch((err) => {
  res.send(err);
  console.log(err);
});