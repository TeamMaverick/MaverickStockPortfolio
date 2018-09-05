
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
  }
}