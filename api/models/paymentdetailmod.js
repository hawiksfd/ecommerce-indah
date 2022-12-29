'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentDetailMod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentDetailMod.init(
    {
      ei_uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      ei_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ei_provider: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ei_status: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      tableName: "payment_details"
      modelName: "PaymentDetailMod",
    }
  );
  return PaymentDetailMod;
};