"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductStores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Products.belongsTo(models.ProductImages, {foreignKey:'proId', targetKey:'imgId', as:'imgData'})
    }
  }
  ProductStores.init(
    {
      storeId: DataTypes.STRING,
      importPrices: DataTypes.FLOAT,
      number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductStores",
    }
  );
  return ProductStores;
};
