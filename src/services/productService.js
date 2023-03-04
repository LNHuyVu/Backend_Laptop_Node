import db from "../models/index";

let checkProductName = async (productName) => {
  try {
    let product = await db.Products.findOne({
      where: { name: productName },
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
      product = await db.Products.findAll({});
    }
    if (productId && productId !== "ALL") {
      product = await db.Products.findOne({
        where: { id: productId },
      });
    }
    return product;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewProduct = async (data) => {
  try {
    let check = await checkProductName(data.name);
    if (check === true) {
      return {
        errCode: 1,
        message: "Your name product is already in used",
      };
    } else {
      await db.Products.create({
        name: data.name,
        slug: data.slug,
        catid: data.catid,
        img: data.img,
        detail: data.detail,
        number: data.number,
        price: data.price,
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
      (product.name = data.name),
        (product.slug = data.slug),
        (product.catid = data.catid),
        (product.img = data.img),
        (product.detail = data.detail),
        (product.number = data.number),
        (product.price = data.price),
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
module.exports = {
  getAllProducts: getAllProducts,
  createNewProduct: createNewProduct,
  deleteProduct: deleteProduct,
  editProduct: editProduct,
};
