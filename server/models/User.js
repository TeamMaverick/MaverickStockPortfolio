const db = require('../../database/index.js');
const Sequelize = require('sequelize');

const User = db.define('users', {
    username: { type: Sequelize.STRING, unique: true, allowNull: false },
    firstname: { type: Sequelize.STRING },
    lastname: { type: Sequelize.STRING },
    uid: { type: Sequelize.STRING }
  });
  
  
  module.exports = User;