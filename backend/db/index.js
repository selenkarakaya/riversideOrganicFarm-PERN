// db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: console.log, // opsiyonel: SQL sorgularını görmek için
});

module.exports = sequelize;

/*
This file acts like a central **database connection module**. You can access it from anywhere in your application to run database queries.
Look controllers
*/
