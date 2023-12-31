// File: src/config/config.js
// This file will hold all the config for our server.
require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        options: {
            dialect: process.env.DIALECT,
            host: process.env.HOST,
            storage: './data/bobgarage.sqlite',
        }
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET
    },
    nodemailer_transport: {
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    }
};