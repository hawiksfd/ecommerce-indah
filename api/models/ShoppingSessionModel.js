import { Sequelize } from "sequelize";
import dbei from "./../config/dbei.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const ShoppingSession = dbei.define(
  "shopping_sessions",
  {
    ei_uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ei_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasOne(ShoppingSession);
ShoppingSession.belongsTo(User, {
  foreignKey: "userId",
});

export default ShoppingSession;
