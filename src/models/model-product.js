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
      Products.belongsTo(models.ProductImages, {
        foreignKey: "proId",
        targetKey: "imgId",
        as: "imgData",
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      });
      Products.belongsTo(models.ProductOptions, {
        foreignKey: "proId",
        targetKey: "optionId",
        as: "option",
        onUpdate: "cascade",
        onDelete: "cascade",
        hooks: true,
      });
      Products.belongsTo(models.ProductStores, {
        foreignKey: "proId",
        targetKey: "storeId",
        as: "store",
        onUpdate: "cascade",
        onDelete: "cascade",
        hooks: true,
      });
      //Product Sale
      Products.belongsTo(models.ProductSales, {
        foreignKey: "id",
        targetKey: "saleId",
        as: "sale",
        onUpdate: "cascade",
        onDelete: "cascade",
        hooks: true,
      });
    }
  }
  Products.init(
    {
      nameProduct: DataTypes.STRING,
      slugProduct: DataTypes.STRING,
      catId: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      detail: DataTypes.TEXT,
      proId: DataTypes.STRING,
      type: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
