// File: src/config/config.js
// This file will hold all the config for our server.

module.exports = {
    port: process.env.PORT || 3060,
    db: {
        database: process.env.DB_NAME || 'bobgarage',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'root',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './data/bobgarage.sqlite',
        }
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET
    }
};