const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: (sql, options) => {
        if (options.logging === 'error') {
            console.error(sql);
        }
    },
});

module.exports = sequelize;
