const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('stagefacile', 'root','', {
    host: 'localhost',
    dialect: 'mysql',
  });

  module.exports = sequelize