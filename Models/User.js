const { db, DataTypes, Model } = require("../db");

class User extends Model {}

User.init(
  {
    role: DataTypes.STRING,
    emailaddress: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize: db,
  }
);

module.exports = { User };
