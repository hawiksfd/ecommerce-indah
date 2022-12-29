'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiscountMod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DiscountMod.init(
    {
      ei_uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      ei_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100]
        },
      },
      ei_start: {
        type: DataTypes.DATE,
        allowNull: false
      },
      ei_end: {
        type: DataTypes.DATE,
        allowNull: false
      },
      ei_discount_percent: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
    },
    {
      sequelize,
      tableName: "discounts"
      modelName: "DiscountMod",
    }
  );
  return DiscountMod;
};