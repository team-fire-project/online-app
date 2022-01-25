// Instantiate all the dependencies needed
const express = require("express");
const app = express();

const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const PORT = 5000;
const { seed } = require("./seed.js");
const { Category, Inventory, User } = require("./Models/index.js");

// Configurating hanlebars library to work well w/ express + sequelize model
const handlebars = engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

// Tell this express app that we're using handlebars
app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

// support the parsing of incoming requests with urlencoded payloads (e.g. form POST)
app.use(express.urlencoded({ extended: false }));
// support the parsing of incoming requests with json payloads
app.use(express.json());
// Server static assets from the public folder instead of JSON file
app.use(express.static("public"));

app.get("/", (req, res) => res.send("TEST"));

app.get("/stockhome/categories", async (req, res) => {
  const categories = await Category.findAll();
  res.render("categories", { categories });
});

app.get("/stockhome/inventories", async (req, res) => {
  const inventories = await Inventory.findAll();
  res.render("inventories", { inventories });
});

app.get("/stockhome/users", async (req, res) => {
  const users = await User.findAll();
  res.render("users", { users });
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
