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
    ei_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ei_kecamatan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ei_city: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ei_province: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ei_pcode: {
      type: DataTypes.TEXT,
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
  { freezeTableName: true }
);

export default User;
