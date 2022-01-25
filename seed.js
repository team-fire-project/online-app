const Sequelize = require('sequelize')
module.exports = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "./online_store_inventory.db",
  logging: false,
});

















/*const express = require("express");
const app = express();
const Handlebars = require("handlebars");
const { engine } = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const { seed } = require("./index");
const { Show, User } = require("./Models/index");
const port = 5000;
const { Op } = require("sequelize");
const handlebars = engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});*/
