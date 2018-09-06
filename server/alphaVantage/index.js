const axios = require('axios');

const getData = (ticker) => {
  // return axios.get(process.env.API,  {
  //   API_Key : proces.env.API_KEY
  // })
  //   .then(({data}) => {
  //     console.log(data)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  return axios.get(process.env.API, {
    params: {
      function: 'TIME_SERIES_INTRADAY',
      interval: '5min',
      apikey: process.env.API_KEY,
      symbol: ticker
    }
  });
};

module.exports.getData = getData;
