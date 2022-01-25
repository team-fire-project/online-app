const { Inventory } = require("./Inventory");
const { Category } = require("./Category");
const { User } = require("./User");

User.hasMany(Category);
Category.belongsTo(User);

Category.hasMany(Inventory);
Inventory.belongsTo(Category);

// console.log("Inventory class:", Inventory.category);

module.exports = { Inventory, Category, User };
