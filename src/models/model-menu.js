"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Menus.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      img:DataTypes.STRING,
      link: DataTypes.STRING,
      parentid: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Menus",
    }
  );
  return Menus;
};
