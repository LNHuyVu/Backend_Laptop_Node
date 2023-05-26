"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.hasMany(models.Orderdetails, { as: "orderDetail" });
      // 
      Orders.belongsTo(models.User, {
        foreignKey: "userId",
        as: "cart",
      });
      //User
      Orders.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Orders.init(
    {
      name:DataTypes.STRING,
      userId:DataTypes.STRING,
      codeOrder: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
