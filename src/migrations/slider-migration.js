'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('Sliders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      sliderId: {
        type: Sequelize.STRING
      },
      positon: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sliders');
  }
};