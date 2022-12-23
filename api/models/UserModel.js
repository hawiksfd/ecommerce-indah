import { Sequelize } from "sequelize";
import dbei from "./../config/dbei.js";

const { DataTypes } = Sequelize;

const User = dbei.define(
  "users",
  {
    ei_uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ei_username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 15],
      },
    },
    ei_firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    ei_lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    ei_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    ei_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ei_hp: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
  { freezeTableName: true }
);

export default User;
