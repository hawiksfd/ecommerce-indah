import { Sequelize } from "sequelize";
import dbei from "./../config/dbei.js";
import User from "./UserModel.js";
import PaymentDetail from "./PaymentDetailModel.js";

const { DataTypes } = Sequelize;

const OrderDetail = dbei.define(
  "order_details",
  {
    ei_uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
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
    ei_total: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    ei_paymentDetailId: {
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

PaymentDetail.hasOne(OrderDetail);
OrderDetail.belongsTo(PaymentDetail, {
  foreignKey: "paymentDetailId",
});

User.hasOne(OrderDetail);
OrderDetail.belongsTo(User, {
  foreignKey: "userId",
});

export default OrderDetail;
