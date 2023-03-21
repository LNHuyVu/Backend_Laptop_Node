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
      typeId: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      detail: DataTypes.TEXT,
      proId: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
