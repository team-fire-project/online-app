const { db, DataTypes, Model } = require("../db");

class User extends Model {}

User.init(
  {
    role: DataTypes.STRING,
    emailaddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: false,
  }
);

module.exports = { User };
