"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Posts.init(
    {
      title: DataTypes.STRING,
      topId: DataTypes.INTEGER,
      slug: DataTypes.STRING,
      type:DataTypes.STRING,
      detail: DataTypes.TEXT,
      image: DataTypes.JSON,
      createdBy:DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
