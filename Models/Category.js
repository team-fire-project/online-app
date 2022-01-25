const { db, DataTypes, Model } = require("../db");

class Category extends Model {}

Category.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize: db,
  }
);

module.exports = { Category };
