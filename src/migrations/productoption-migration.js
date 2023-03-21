"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProductOptions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      optionId: {
        type: Sequelize.STRING,
      },
      cpu: {
        type: Sequelize.INTEGER,
      },
      cpuGen: {
        type: Sequelize.INTEGER,
      },
      ram: {
        type: Sequelize.INTEGER,
      },
      demand: {
        type: Sequelize.INTEGER,
      },
      hdrive: {
        type: Sequelize.INTEGER,
      },
      card: {
        type: Sequelize.INTEGER,
      },
      screen: {
        type: Sequelize.INTEGER,
      },
      system: {
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
    await queryInterface.dropTable("ProductOptions");
  },
};
