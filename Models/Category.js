const { db, DataTypes, Model } = require("../db");

class Category extends Model {}

Category.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize: db,
    timestamps: false,
  }
);

module.exports = { Category };
