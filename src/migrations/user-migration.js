'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    //   name: DataTypes.STRING,
    //   email: DataTypes.STRING,
    //   password: DataTypes.STRING,
    //   img: DataTypes.STRING,
    //   gender: DataTypes.BOOLEAN,
    //   phone: DataTypes.STRING,
    //   roles: DataTypes.STRING,
    //   status: DataTypes.INTEGER,
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.BOOLEAN
      },
      phone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      roles: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};