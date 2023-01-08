import { Sequelize } from "sequelize";
import dbei from "./../config/dbei.js";
import OrderDetail from "./OrderDetailModel.js";
import Product from "./ProductModel.js";

const { DataTypes } = Sequelize;

const OrderItem = dbei.define(
  "order_items",
  {
    ei_uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    ei_orderDetailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

OrderDetail.hasMany(OrderItem);
OrderItem.belongsTo(OrderDetail, { foreignKey: "orderDetailId" });

Product.hasOne(OrderItem);
OrderItem.belongsTo(Product, {
  foreignKey: "productId",
});

export default OrderItem;
