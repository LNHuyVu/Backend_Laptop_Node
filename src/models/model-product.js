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
      img: DataTypes.STRING,
      detail: DataTypes.STRING,
      number: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
