import { Sequelize } from "sequelize";
import dbei from "./../config/dbei.js";
// import User from "./UserModel.js";
import Discount from "./DiscountModel.js";

const { DataTypes } = Sequelize;

const Product = dbei.define(
  "products",
  {
    ei_uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ei_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    ei_desc: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [0, 1000],
      },
    },
    ei_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ei_discountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    ei_userId: {
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

Discount.hasMany(Product);
Product.belongsTo(Discount, { foreignKey: "discountId" });

export default Product;
