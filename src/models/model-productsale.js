"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductSales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductSales.init(
    {
      saleId: DataTypes.STRING,
      valueSale: DataTypes.FLOAT,
      startDay: DataTypes.DATEONLY,
      endDay: DataTypes.DATEONLY,
      createdBy:DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductSales",
    }
  );
  return ProductSales;
};
