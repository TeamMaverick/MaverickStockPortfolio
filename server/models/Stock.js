const db = require('../../database/index.js');
const Sequelize = require('sequelize');

const Stock = db.define('stocks', {
  stock_ticker: {type : Sequelize.STRING },
  company_name: Sequelize.STRING,
  quantity : Sequelize.INTEGER,
  price : Sequelize.FLOAT(9, 2),
  uid : Sequelize.STRING,
  change : Sequelize.FLOAT(9, 2)
},
{
  indexes:[
    {
      unique: true,
      fields: ['stock_ticker', 'uid']
    }
  ]
});


module.exports = Stock;