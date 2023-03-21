"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProductStores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      storeId: {
        type: Sequelize.INTEGER,
      },
      importPrices: {
        type: Sequelize.FLOAT,
      },
      number: {
        type: Sequelize.INTEGER,
      },
      sold: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ProductStores");
  },
};
