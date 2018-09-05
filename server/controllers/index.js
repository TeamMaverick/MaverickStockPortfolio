
const model = require('../models/index.js')

//Return requests to the client
module.exports = {
  post: (req, res) => {
    model.post(req.body.stock, () => {
      console.log('SAVED');
    });
  },

  get: function (callback) {
    model.get(callback);
  },
    
getStockInfo : (req, res) => {
  axios.get(process.env.API, {
    params: {
      function : 'TIME_SERIES_INTRADAY',
      interval: '5min',
      apikey : process.env.API_KEY,
      symbol : req.query.STOCK
    }
  })
    .then(({data}) => {
    
      returnData = {
        metaData: data["Meta Data"],
        data: []
      }

      //get Time Series (5min)
      let timeSeries = data["Time Series (5min)"];
      
      for(var key in timeSeries){
        if(timeSeries.hasOwnProperty(key)) {
          var obj = timeSeries[key];
          let arrVaules = []
          for(var prop in obj) {
            console.log(prop + " = " + obj[prop]);
            arrVaules.push(parseFloat(obj[prop]));
          }
          returnData.data.push([Math.floor((new Date(key)) / 1000)].concat(arrVaules));
        }
      }

      res.send(returnData)
    })
    .catch((err) => {
      console.log(err);
    })
  }
}