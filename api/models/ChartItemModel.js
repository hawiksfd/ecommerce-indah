import { Sequelize } from "sequelize";
import dbei from "./../config/dbei.js";
import Product from "./ProductModel.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const ChartItem = dbei.define(
  "chart_items",
  {
    ei_uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ei_qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(ChartItem, { foreignKey: "userid" });
ChartItem.belongsTo(User);

Product.hasMany(ChartItem, { foreignKey: "productid" });
ChartItem.belongsTo(Product);

// toJSON(){
//   return { ...this.get(), id: undefined, userId: undefined,productId: undefined}
// }

export default ChartItem;
