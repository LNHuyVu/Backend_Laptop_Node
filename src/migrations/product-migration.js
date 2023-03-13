'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      catid: {
        type: Sequelize.INTEGER
      },
      typeid: {
        type: Sequelize.INTEGER
      },
      img: {
        type: Sequelize.STRING
      },
      cpu: {
        type: Sequelize.STRING
      },
      ram: {
        type: Sequelize.STRING
      },
      hdrive: {
        type: Sequelize.STRING
      },
      card: {
        type: Sequelize.STRING
      },
      screen: {
        type: Sequelize.STRING
      },
      system: {
        type: Sequelize.STRING
      },
      detail: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.INTEGER
      },
      sold: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT
      },
      pricesale: {
        type: Sequelize.FLOAT
      },
      statussale: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Products');
  }
};