import { Sequelize } from "sequelize";
import dbei from "./../config/dbei.js";

const { DataTypes } = Sequelize;

const Discount = dbei.define(
  "discounts",
  {
    ei_uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    ei_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },
    ei_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ei_end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ei_discount_percent: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Discount;
