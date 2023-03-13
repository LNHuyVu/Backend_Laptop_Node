"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contacts.init(
    {
      name: DataTypes.STRING,
      userid: DataTypes.INTEGER,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      content: DataTypes.TEXT,
      replyid: DataTypes.INTEGER,
      replydetail: DataTypes.TEXT,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Contacts",
    }
  );
  return Contacts;
};
