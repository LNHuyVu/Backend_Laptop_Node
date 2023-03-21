"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductValues extends Model {
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
  ProductValues.init(
    {
      nameValue: DataTypes.STRING,
      parentIdValue: DataTypes.INTEGER,
      statusValue:DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductValues",
    }
  );
  return ProductValues;
};
