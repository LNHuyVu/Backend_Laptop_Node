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
      //product
      ProductOptions.belongsTo(models.Products, {
        foreignKey: "optionId",
        targetKey: "proId",
        as: "product",
        onUpdate: "cascade",
        onDelete: "cascade",
        hooks: true,
      });
      // Products.belongsTo(models.ProductImages, {foreignKey:'proId', targetKey:'imgId', as:'imgData'})
      ProductOptions.belongsTo(models.ProductValues, {
        foreignKey: "cpu",
        targetKey: "id",
        as: "cpuName",
        onUpdate: "cascade",
        onDelete: "cascade",
        hooks: true,
      });
      ProductOptions.belongsTo(models.ProductValues, {
        foreignKey: "ram",
        targetKey: "id",
        as: "ramName",
        onUpdate: "cascade",
        onDelete: "cascade",
        hooks: true,
      });
      ProductOptions.belongsTo(models.ProductValues, {
        foreignKey: "hdrive",
        targetKey: "id",
        as: "hdriveName",
        onUpdate: "cascade",
        onDelete: "cascade",
        hooks: true,
      });
      ProductOptions.belongsTo(models.ProductValues, {
        foreignKey: "screen",
        targetKey: "id",
        as: "screenName",
        onUpdate: "cascade",
        onDelete: "cascade",
        hooks: true,
      });
      ProductOptions.belongsTo(models.ProductValues, {
        foreignKey: "card",
        targetKey: "id",
        as: "cardName",
        onUpdate: "cascade",
        onDelete: "cascade",
        hooks: true,
      });
      ProductOptions.belongsTo(models.ProductValues, {
        foreignKey: "system",
        targetKey: "id",
        as: "systemName",
        onUpdate: "cascade",
        onDelete: "cascade",
        hooks: true,
      });
      ProductOptions.belongsTo(models.ProductValues, {
        foreignKey: "demand",
        targetKey: "id",
        as: "demandName",
        onUpdate: "cascade",
        onDelete: "cascade",
        hooks: true,
      });
      ProductOptions.belongsTo(models.ProductValues, {
        foreignKey: "cpuGen",
        targetKey: "id",
        as: "cpuGenName",
        onUpdate: "cascade",
        onDelete: "cascade",
        hooks: true,
      });
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
