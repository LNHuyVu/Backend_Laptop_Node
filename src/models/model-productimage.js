"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ProductImages.hasOne(models.Products, {
      //   foreignKey: "imgId",
      //   targetKey: "proId",
      //   // as: "imgData",
      //   onUpdate: "CASCADE",
      //   onDelete: "CASCADE",
      // });
    }
  }
  ProductImages.init(
    {
      link: DataTypes.JSON,
      imgId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductImages",
    }
  );
  return ProductImages;
};
