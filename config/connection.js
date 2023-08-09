const Sequelize = require('sequelize');
const path = require('path');

// Add dotenv functionality to hide sensitive info
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Connects to sequelize database
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;
