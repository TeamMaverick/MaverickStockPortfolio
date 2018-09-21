const db = require('../../database/index.js');
const Sequelize = require('sequelize');

const User = db.define('users', {
  username: { type: Sequelize.STRING , unique: true },
  email: { type: Sequelize.STRING , unique: true },
  uid: { type: Sequelize.STRING , unique: true }
});


module.exports = User;