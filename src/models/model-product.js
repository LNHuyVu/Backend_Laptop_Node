"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      catid: DataTypes.INTEGER,
      typeid:DataTypes.INTEGER,
      img: DataTypes.STRING,
      cpu:DataTypes.STRING,
      ram:DataTypes.STRING,
      hdrive:DataTypes.STRING,
      card:DataTypes.STRING,
      screen:DataTypes.STRING,
      system:DataTypes.STRING,
      detail: DataTypes.STRING,
      number: DataTypes.INTEGER,
      sold: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      pricesale: DataTypes.FLOAT,
      statussale: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
