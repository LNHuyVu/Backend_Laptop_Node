"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orderdetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orderdetails.belongsTo(models.Orders, {
        foreignKey: "orderId",
        as: "orderDetail",
      });
      //Product
      Orderdetails.belongsTo(models.Products, {
        foreignKey: "productId",
        targetKey: "id",
        as: "product",
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      });
    }
  }
  Orderdetails.init(
    {
      orderId: DataTypes.STRING,
      productId: DataTypes.STRING,
      price: DataTypes.FLOAT,
      quantity: DataTypes.INTEGER,
      amount: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Orderdetails",
    }
  );
  return Orderdetails;
};
