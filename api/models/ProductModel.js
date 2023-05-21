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
    },
    ei_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
    ei_desc: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 1000],
      },
    },
    ei_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ei_quantity: {
      type: DataTypes.INTEGER,
    },
    discountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ei_image_product: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ei_url_img_product: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Discount.hasMany(Product, { foreignKey: "discountId" });
Product.belongsTo(Discount);

export default Product;
