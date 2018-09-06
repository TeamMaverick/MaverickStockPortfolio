// Boilerplate code for DB
var mysql = require('mysql');
var { dbConfig } = require('../config.js');

var db = mysql.createPool(dbConfig);

module.exports.db = db;
