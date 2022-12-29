'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductMod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductMod.init(
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
        allowNull: false
      },
      ei_discountId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      ei_userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      sequelize,
      tableName: "products"
      modelName: "ProductMod",
    }
  );
  return ProductMod;
};