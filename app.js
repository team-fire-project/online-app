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

// A route that users can view all items
app.get("/stockhome/inventories", async (req, res) => {
  const inventories = await Inventory.findAll();
  res.render("inventories", { inventories });
});

// A route that users can get a specific category of items
app.get("/stockhome/inventories/categories/:category", async (req, res) => {
  const categories = req.params.category;
  const inventories = await Inventory.findAll({
    where: { category: categories },
  });
  res.render("categories", { inventories });
});

// A route that users can view one item
app.get("/stockhome/inventories/:id", async (req, res) => {
  const inventoryID = req.params.id;
  const inventory = await Inventory.findByPk(inventoryID);
  res.render("inventory", { inventory });
});

// Creating new inventory item using handlebars form
app.get("/stockhome/add-inventory-form", (req, res) => {
  res.render("addInventoryForm");
});
app.post("/stockhome/add-inventory", async (req, res) => {
  const newInventory = await Inventory.create(req.body);
  const foundInventory = await Inventory.findByPk(newInventory.id);
  if (foundInventory && res.status(200)) {
    res.send("Inventory added successfully!");
  } else {
    res.send("Something went wrong, please try again...");
  }
});

app.listen(PORT, async () => {
  await seed();
  console.log(`Server started on port ${PORT}`);
});
