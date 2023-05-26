import db from "../models/index";
const { Op } = require("sequelize");
let checkProductName = async (productName) => {
  try {
    let product = await db.Products.findOne({
      where: { nameProduct: productName },
    });
    if (product) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw new Error(e);
  }
};

let getAllProducts = async (productId) => {
  try {
    let product = "";
    if (productId === "ALL") {
      product = await db.Products.findAll({
        order: [["id", "DESC"]],
        include: [
          {
            model: db.ProductSales,
            as: "sale",
          },
          {
            model: db.ProductImages,
            as: "imgData",
            attributes: ["id", "imgId", "link"],
          },
          {
            model: db.ProductStores,
            as: "store",
            attributes: ["id", "importPrices", "number"],
          },
          {
            model: db.ProductOptions,
            as: "option",
            include: [
              {
                model: db.ProductValues,
                as: "cpuName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "ramName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "hdriveName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "screenName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "cardName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "systemName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "demandName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "cpuGenName",
                attributes: ["id", "nameValue"],
              },
            ],
            attributes: {
              exclude: [
                "cpu",
                "ram",
                "hdrive",
                "screen",
                "system",
                "cpuGen",
                "card",
                "demand",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["detail"],
        },
      });
    }
    if (productId && productId !== "ALL") {
      product = await db.Products.findOne({
        where: { id: productId },
        include: [
          {
            model: db.ProductSales,
            as: "sale",
          },
          {
            model: db.ProductImages,
            as: "imgData",
            attributes: ["id", "imgId", "link"],
          },
          {
            model: db.ProductStores,
            as: "store",
            attributes: ["id", "importPrices", "number"],
          },
          {
            model: db.ProductOptions,
            as: "option",
            include: [
              {
                model: db.ProductValues,
                as: "cpuName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "ramName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "hdriveName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "screenName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "cardName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "systemName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "demandName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "cpuGenName",
                attributes: ["id", "nameValue"],
              },
            ],
            attributes: {
              exclude: [
                "cpu",
                "ram",
                "hdrive",
                "screen",
                "system",
                "cpuGen",
                "card",
                "demand",
              ],
            },
          },
        ],
      });
    }
    return product;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewProduct = async (data) => {
  try {
    let check = await checkProductName(data.nameProduct);
    if (check === true) {
      return {
        errCode: 1,
        message: "Your name product is already in used",
      };
    } else {
      await db.Products.create({
        nameProduct: data.nameProduct,
        slugProduct: data.slugProduct,
        catId: data.catId,
        price: data.price,
        detail: data.detail,
        proId: data.proId,
        type: data.type,
        createdBy: data.createdBy,
        status: data.status,
      });
      return {
        errCode: 0,
        message: "Create Product OK",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let deleteProduct = async (productId) => {
  let product = await db.Products.findOne({
    where: { id: productId },
  });
  if (!product) {
    return {
      errCode: 2,
      message: "Not Exit Product",
    };
  }
  await db.Products.destroy({
    where: { id: productId },
  });
  return {
    errCode: 0,
    message: "Delete Product OK",
  };
};
let editProduct = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID Product",
      };
    }
    let product = await db.Products.findOne({
      where: { id: data.id },
    });
    if (product) {
      (product.nameProduct = data.nameProduct),
        (product.slugProduct = data.slugProduct),
        (product.catId = data.catId),
        (product.price = data.price),
        (product.detail = data.detail),
        (product.proId = data.proId),
        (product.type = data.type),
        (product.createdBy = data.createdBy),
        (product.status = data.status);
      await product.save();
      return {
        errCode: 0,
        message: "Update product OK",
      };
    } else {
      return {
        errCode: 2,
        message: "Product not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
//Cus
let getIdProductCustomer = async (slug) => {
  try {
    let product = "";
    if (slug) {
      product = await db.Products.findOne({
        where: { slugProduct: slug },
        include: [
          {
            model: db.ProductSales,
            as: "sale",
          },
          {
            model: db.ProductImages,
            as: "imgData",
            attributes: ["id", "imgId", "link"],
          },
          {
            model: db.ProductStores,
            as: "store",
            attributes: ["id", "importPrices", "number"],
          },
          {
            model: db.ProductOptions,
            as: "option",
            include: [
              {
                model: db.ProductValues,
                as: "cpuName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "ramName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "hdriveName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "screenName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "cardName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "systemName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "demandName",
                attributes: ["id", "nameValue", "slug"],
              },
              {
                model: db.ProductValues,
                as: "cpuGenName",
                attributes: ["id", "nameValue"],
              },
            ],
            attributes: {
              exclude: [
                "cpu",
                "ram",
                "hdrive",
                "screen",
                "system",
                "cpuGen",
                "card",
                "demand",
              ],
            },
          },
        ],
      });
    }
    return product;
  } catch (e) {
    throw new Error(e);
  }
};
let getCatProductCustomer = async (catId) => {
  try {
    let product = "";
    if (catId && catId != "1" &&catId!="2") {
      product = await db.Products.findAll({
        where: { catId: catId },
        include: [
          {
            model: db.ProductSales,
            as: "sale",
          },
          {
            model: db.ProductImages,
            as: "imgData",
            attributes: ["id", "imgId", "link"],
          },
          {
            model: db.ProductStores,
            as: "store",
            attributes: ["id", "number"],
          },
          {
            model: db.ProductOptions,
            as: "option",
            include: [
              {
                model: db.ProductValues,
                as: "cpuName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "ramName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "hdriveName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "screenName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "cardName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "systemName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "demandName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "cpuGenName",
                attributes: ["id", "nameValue"],
              },
            ],
            attributes: {
              exclude: [
                "cpu",
                "ram",
                "hdrive",
                "screen",
                "system",
                "cpuGen",
                "card",
                "demand",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["detail"],
        },
      });
      return product;
    }
    if (catId == 1) {
      product = await db.Products.findAll({
        where: { type: "LT" },
        include: [
          {
            model: db.ProductSales,
            as: "sale",
          },
          {
            model: db.ProductImages,
            as: "imgData",
            attributes: ["id", "imgId", "link"],
          },
          {
            model: db.ProductStores,
            as: "store",
            attributes: ["id", "number"],
          },
          {
            model: db.ProductOptions,
            as: "option",
            include: [
              {
                model: db.ProductValues,
                as: "cpuName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "ramName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "hdriveName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "screenName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "cardName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "systemName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "demandName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "cpuGenName",
                attributes: ["id", "nameValue"],
              },
            ],
            attributes: {
              exclude: [
                "cpu",
                "ram",
                "hdrive",
                "screen",
                "system",
                "cpuGen",
                "card",
                "demand",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["detail"],
        },
      });
      return product;
    }
    if (catId == 2) {
      product = await db.Products.findAll({
        where: { type: "PK" },
        include: [
          {
            model: db.ProductSales,
            as: "sale",
          },
          {
            model: db.ProductImages,
            as: "imgData",
            attributes: ["id", "imgId", "link"],
          },
          {
            model: db.ProductStores,
            as: "store",
            attributes: ["id", "number"],
          },
          {
            model: db.ProductOptions,
            as: "option",
            include: [
              {
                model: db.ProductValues,
                as: "cpuName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "ramName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "hdriveName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "screenName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "cardName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "systemName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "demandName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "cpuGenName",
                attributes: ["id", "nameValue"],
              },
            ],
            attributes: {
              exclude: [
                "cpu",
                "ram",
                "hdrive",
                "screen",
                "system",
                "cpuGen",
                "card",
                "demand",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["detail"],
        },
      });
      return product;
    }
  } catch (e) {
    throw new Error(e);
  }
};
let searchProductCustomer = async (slug) => {
  try {
    let product = "";
    if (slug) {
      product = await db.Products.findAll({
        where: {
          slugProduct: {
            [Op.like]: "%" + slug + "%",
          },
        },
        include: [
          {
            model: db.ProductSales,
            as: "sale",
          },
          {
            model: db.ProductImages,
            as: "imgData",
            attributes: ["id", "imgId", "link"],
          },
          {
            model: db.ProductStores,
            as: "store",
            attributes: ["id", "number"],
          },
          {
            model: db.ProductOptions,
            as: "option",
            include: [
              {
                model: db.ProductValues,
                as: "cpuName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "ramName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "hdriveName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "screenName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "cardName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "systemName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "demandName",
                attributes: ["id", "nameValue"],
              },
              {
                model: db.ProductValues,
                as: "cpuGenName",
                attributes: ["id", "nameValue"],
              },
            ],
            attributes: {
              exclude: [
                "cpu",
                "ram",
                "hdrive",
                "screen",
                "system",
                "cpuGen",
                "card",
                "demand",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["detail"],
        },
      });
      return product;
    }
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  getAllProducts: getAllProducts,
  createNewProduct: createNewProduct,
  deleteProduct: deleteProduct,
  editProduct: editProduct,
  //Cus
  getIdProductCustomer: getIdProductCustomer,
  getCatProductCustomer: getCatProductCustomer,
  searchProductCustomer: searchProductCustomer,
};
