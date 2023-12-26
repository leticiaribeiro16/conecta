const { Sequelize } = require('sequelize');

const config = {
  development: {
    username: 'leticia',
    password: '26DeMaioDe2005.',
    database: 'conecta',
    host: 'conectaifrn.mysql.database.azure.com',
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      timestamps: false,
      underscored: true, 
    },
  },
};

module.exports = config;
