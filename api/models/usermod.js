"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserMod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserMod.init(
    {
      ei_uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      ei_username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [7, 15],
        },
      },
      ei_firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      ei_lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      ei_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      ei_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ei_hp: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      ei_image: {
        type: DataTypes.STRING,
      },
      ei_urlImg: {
        type: DataTypes.STRING,
      },
      ei_refresh_token: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "UserMod",
    }
  );
  return UserMod;
};
