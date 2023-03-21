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
      product = await db.Products.findAll({
        include: [
          {
            model: db.ProductImages,
            as: "imgData",
            attributes: ["id", "nameImage", "link", "alt"],
          },
        ],
      });
    }
    if (productId && productId !== "ALL") {
      product = await db.Products.findOne({
        where: { id: productId },
        include: [
          {
            model: db.ProductImages,
            as: "imgData",
            attributes: ["id", "nameImage", "link", "alt"],
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
        typeid: data.typeid,
        img: data.img,
        cpu: data.cpu,
        ram: data.ram,
        hdrive: data.hdrive,
        card: data.card,
        screen: data.screen,
        system: data.system,
        detail: data.detail,
        number: data.number,
        sold: data.sold,
        price: data.price,
        pricesale: data.pricesale,
        statussale: data.statussale,
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
        (product.typeid = data.typeid),
        (product.img = data.img),
        (product.cpu = data.cpu),
        (product.ram = data.ram),
        (product.hdrive = data.hdrive),
        (product.card = data.card),
        (product.screen = data.screen),
        (product.system = data.system),
        (product.detail = data.detail),
        (product.number = data.number),
        (product.sold = data.sold),
        (product.price = data.price),
        (product.pricesale = data.pricesale),
        (product.statussale = data.statussale),
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
