import { Sequelize } from "sequelize";
import dbei from "./../config/dbei.js";
import User from "./UserModel.js";
import PaymentDetail from "./PaymentDetailModel.js";
import Product from "./ProductModel.js";

const { DataTypes } = Sequelize;

const OrderDetail = dbei.define(
  "order_details",
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
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ei_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentDetailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Product.hasMany(OrderDetail, {
  foreignKey: "productId",
});
OrderDetail.belongsTo(Product);

PaymentDetail.hasOne(OrderDetail);
OrderDetail.belongsTo(PaymentDetail, {
  foreignKey: "paymentDetailId",
});

User.hasMany(OrderDetail, {
  foreignKey: "userId",
});
OrderDetail.belongsTo(User);

export default OrderDetail;
