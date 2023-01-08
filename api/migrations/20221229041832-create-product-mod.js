"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
      ei_desc: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 1000],
        },
      },
      ei_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ei_discountId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ei_image_product: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ei_url_img_product: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("products");
  },
};
