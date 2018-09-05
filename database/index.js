// Boilerplate code for DB
var mysql = require('mysql');
var { dbConfig } = require('../config.js');

// save to config file
var connection = mysql.createPool(dbConfig);

// var selectAll = function(callback) {
//   connection.query('SELECT * FROM items', function(err, results, fields) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };

// module.exports.selectAll = selectAll;
module.exports.connection = connection;
