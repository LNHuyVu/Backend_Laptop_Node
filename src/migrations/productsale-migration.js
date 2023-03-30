"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProductSales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      saleId: {
        type: Sequelize.STRING,
      },
      valueSale: {
        type: Sequelize.FLOAT,
      },
      startDay: {
        type: Sequelize.DATEONLY,
      },
      endDay: {
        type: Sequelize.DATEONLY,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      createdBy: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("ProductSales");
  },
};
