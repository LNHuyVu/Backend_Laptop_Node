import db from "../models/index";

let getAllProductStore = async (productId) => {
  try {
    let productstore = "";
    if (productId === "ALL") {
      productstore = await db.ProductStores.findAll({
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
      productstore = await db.ProductStores.findOne({
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
    return productstore;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewProductStore = async (data) => {
  try {
    // let check = await checkProductName(data.nameValue);
    // if (check === true) {
    //   return {
    //     errCode: 1,
    //     message: "Your name product value is already in used",
    //   };
    // } else
    {
      await db.ProductStores.create({
        storeId: data.storeId,
        importPrices: data.importPrices,
        number: data.number,
      });
      return {
        errCode: 0,
        message: "Create ProductStore OK",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let deleteProductStore = async (productId) => {
  let product = await db.ProductStores.findOne({
    where: { storeId: productId },
  });
  if (!product) {
    return {
      errCode: 2,
      message: "Not Exit Product Store",
    };
  }
  await db.ProductStores.destroy({
    where: { storeId: productId },
  });
  return {
    errCode: 0,
    message: "Delete Product Store OK",
  };
};
let editProductStore = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID Product Store",
      };
    }
    let product = await db.ProductStores.findOne({
      where: { id: data.id },
    });
    if (product) {
      (product.storeId = data.storeId),
      (product.importPrices = data.importPrices),
      (product.number = data.number),
      await product.save();
      return {
        errCode: 0,
        message: "Update product Store OK",
      };
    } else {
      return {
        errCode: 2,
        message: "Product Store not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let quantityProductStore = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID Product Store",
      };
    }
    let product = await db.ProductStores.findOne({
      where: { storeId: data.id },
    });
    let number=product.number;
    if (product) {
      (product.storeId = data.storeId),
      (product.number = number-data.number),
      await product.save();
      return {
        errCode: 0,
        message: "Update product Store OK",
      };
    } else {
      return {
        errCode: 2,
        message: "Product Store not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  getAllProductStore: getAllProductStore,
  createNewProductStore: createNewProductStore,
  deleteProductStore: deleteProductStore,
  editProductStore: editProductStore,
  //
  quantityProductStore:quantityProductStore
};
