const { Sequelize, DataTypes, Model } = require("sequelize");

const db = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "./online_store_inventory.db",
  logging: false,
});

module.exports = { db, DataTypes, Model };
