import { Sequelize } from "sequelize";
import dbei from "./../config/dbei.js";
import ShoppingSession from "./ShoppingSessionModel.js";
import Product from "./ProductModel.js";

const { DataTypes } = Sequelize;

const ChartItem = dbei.define(
  "chart_items",
  {
    ei_uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ei_sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ei_productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ei_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

ShoppingSession.hasMany(ChartItem);
ChartItem.belongsTo(ShoppingSession, { foreignKey: "shoppingSessionId" });

Product.hasOne(ChartItem);
ChartItem.belongsTo(Product, { foreignKey: "productId" });

export default ChartItem;
