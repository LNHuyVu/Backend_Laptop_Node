"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductOptions extends Model {
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
  ProductOptions.init(
    {
      optionId: DataTypes.STRING,
      cpu: DataTypes.INTEGER,
      cpuGen: DataTypes.INTEGER,
      ram: DataTypes.INTEGER,
      demand: DataTypes.INTEGER,
      hdrive: DataTypes.INTEGER,
      card: DataTypes.INTEGER,
      screen: DataTypes.INTEGER,
      system: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductOptions",
    }
  );
  return ProductOptions;
};
