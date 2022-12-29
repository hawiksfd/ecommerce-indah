'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetailMod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderDetailMod.init(
    {
      ei_uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      ei_userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ei_total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ei_paymentDetailId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "order_details"
      modelName: "OrderDetailMod",
    }
  );
  return OrderDetailMod;
};