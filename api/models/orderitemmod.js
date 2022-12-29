'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItemMod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderItemMod.init(
    {
      ei_uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      ei_orderDetailId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ei_productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      sequelize,
      tableName: "order_items"
      modelName: "OrderItemMod",
    }
  );
  return OrderItemMod;
};