import { Sequelize } from "sequelize";
import dbei from "./../config/dbei.js";
import ChartItem from "./ChartItemModel.js";

const { DataTypes } = Sequelize;

const OrderDetail = dbei.define(
  "order_details",
  {
    ei_uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    chartItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ei_ship_cost: {
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

ChartItem.hasOne(OrderDetail, {
  foreignKey: "chartItemId",
});
OrderDetail.belongsTo(ChartItem);

export default OrderDetail;
