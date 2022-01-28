const path = require("path");
const fs = require("fs").promises;
const { db } = require("./db");
const { Category, Inventory, User } = require("./Models/index");

const seed = async () => {
  // Clear Model data
  await db.sync({ force: true });

  const seedPathCategory = path.join(__dirname, "./JSON/categories.json");
  const seedPathInventory = path.join(__dirname, "./JSON/inventories.json");
  const seedPathUser = path.join(__dirname, "./JSON/users.json");

  const bufferCategory = await fs.readFile(seedPathCategory);
  const bufferInventory = await fs.readFile(seedPathInventory);
  const bufferUser = await fs.readFile(seedPathUser);

  const { dataCategories } = JSON.parse(bufferCategory);
  const { dataInventories } = JSON.parse(bufferInventory);
  const { dataUsers } = JSON.parse(bufferUser);

  const categoryPromises = dataCategories.map((categories) =>
    Category.create(categories)
  );
  const inventoryPromises = dataInventories.map((inventories) =>
    Inventory.create(inventories)
  );
  const userPromises = dataUsers.map((users) => User.create(users));

  await Promise.all(categoryPromises);
  await Promise.all(inventoryPromises);
  await Promise.all(userPromises);

  console.log("Seed function is running");
};

module.exports = { seed };
