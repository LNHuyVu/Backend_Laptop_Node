import db from "../models/index";

let checkProductName = async (productName) => {
  try {
    let productvalue = await db.ProductValues.findOne({
      where: { nameValue: productName },
    });
    if (productvalue) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw new Error(e);
  }
};

let getAllProductValue = async (productId) => {
  try {
    let productvalue = "";
    if (productId === "ALL") {
      productvalue = await db.ProductValues.findAll({
        // include: [
        //   {
        //     model: db.ProductImages,
        //     as: "imgData",
        //     attributes: ["id", "nameImage", "link", "alt"],
        //   },
        // ],
      });
    }
    if (productId && productId !== "ALL") {
      productvalue = await db.ProductValues.findOne({
        where: { id: productId },
        // include: [
        //   {
        //     model: db.ProductImages,
        //     as: "imgData",
        //     attributes: ["id", "nameImage", "link", "alt"],
        //   },
        // ],
      });
    }
    return productvalue;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewProductValue = async (data) => {
  try {
    let check = await checkProductName(data.nameValue);
    if (check === true) {
      return {
        errCode: 1,
        message: "Your name product value is already in used",
      };
    } else 
    {
      await db.ProductValues.create({
        nameValue: data.nameValue,
        parentIdValue: data.parentIdValue,
        statusValue:data.statusValue,
      });
      return {
        errCode: 0,
        message: "Create ProductValue OK",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let deleteProductValue = async (productId) => {
  let product = await db.ProductValues.findOne({
    where: { id: productId },
  });
  if (!product) {
    return {
      errCode: 2,
      message: "Not Exit Product Value",
    };
  }
  await db.ProductValues.destroy({
    where: { id: productId },
  });
  return {
    errCode: 0,
    message: "Delete Product Value OK",
  };
};
let editProductValue = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID Product Value",
      };
    }
    let product = await db.ProductValues.findOne({
      where: { id: data.id },
    });
    if (product) {
      (product.nameValue = data.nameValue),
      (product.parentIdValue = data.parentIdValue);
      (product.statusValue = data.statusValue);
      await product.save();
      return {
        errCode: 0,
        message: "Update product Value OK",
      };
    } else {
      return {
        errCode: 2,
        message: "Product Value not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  getAllProductValue: getAllProductValue,
  createNewProductValue: createNewProductValue       ,
  deleteProductValue: deleteProductValue,
  editProductValue: editProductValue,
};
