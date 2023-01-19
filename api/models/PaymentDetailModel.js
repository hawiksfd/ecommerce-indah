import { Sequelize } from "sequelize";
import dbei from "./../config/dbei.js";
import OrderDetail from "./OrderDetailModel.js";

const { DataTypes } = Sequelize;

const PaymentDetail = dbei.define(
  "payment_details",
  {
    ei_uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    orderDetailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ei_id_order: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ei_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ei_provider: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ei_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

OrderDetail.hasOne(PaymentDetail);
PaymentDetail.belongsTo(OrderDetail, {
  foreignKey: "orderDetailId",
});

export default PaymentDetail;
