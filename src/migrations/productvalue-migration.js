"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProductValues", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nameValue: {
        type: Sequelize.STRING,
      },
      parentIdValue: {
        type: Sequelize.INTEGER,
      },
      statusValue: {
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
    await queryInterface.dropTable("ProductValues");
  },
};
