const { Inventory } = require("./Inventory");
const { Category } = require("./Category");
const { User } = require("./User");

// Associations
User.hasMany(Category);
Category.belongsTo(User);

Category.hasMany(Inventory);
Inventory.belongsTo(Category);

module.exports = { Inventory, Category, User };
