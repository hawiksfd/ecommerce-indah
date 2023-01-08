"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.addColumn("products", "ei_image_product", {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // });
    // await queryInterface.addColumn("products", "ei_url_img_product", {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // });
  },

  async down(queryInterface, DataTypes) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.removeColumn("products", "ei_userId");
  },
};
