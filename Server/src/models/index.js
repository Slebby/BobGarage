// File: src/models/index.js
// This file will create our database and tables if they do not exists.

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

let db = {};

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
);

const Feedback = sequelize.define('Feedback', {
    feedId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    feedbackTitle: { type: DataTypes.STRING },
    feedbackBody: { type: DataTypes.STRING }
});

const Blog = sequelize.define('Blog', {
    blogId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    blogHeader: { type: DataTypes.STRING },
    blogTitle: { type: DataTypes.STRING },
    blogBody: { type: DataTypes.STRING }
});

const CarService = sequelize.define('CarServices', {
    serviceId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    serviceName: { type: DataTypes.STRING },
    serviceDesc: { type: DataTypes.STRING },
    serviceImage: { type: DataTypes.STRING }
});

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userImage: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING},
    isStaff: { type: DataTypes.BOOLEAN, defaultValue: false}
});

User.hasOne(Feedback, {
    foreignKey: 'myUserFeedbackId'
});
Feedback.belongsTo(User);

User.hasOne(Blog, {
    foreignKey: 'myUserBlogId'
});
Blog.belongsTo(User);

console.log(sequelize.models);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log(db);

module.exports = db;
module.exports.Op = Sequelize.Op;