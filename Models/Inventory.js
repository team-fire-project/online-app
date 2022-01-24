const { db, DataTypes, Model } = require("../db");

class Inventory extends Model {}

Inventory.init(
  {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
    counts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = { Inventory };
