import db from "../models/index";
let getAllProductSale = async (productId) => {
  try {
    let productsale = "";
    if (productId === "ALL") {
      productsale = await db.ProductSales.findAll({
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
      productsale = await db.ProductSales.findOne({
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
    return productsale;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewProductSale = async (data) => {
  try {
    // let check = await checkProductName(data.nameValue);
    // if (check === true) {
    //   return {
    //     errCode: 1,
    //     message: "Your name product value is already in used",
    //   };
    // } else
    {
      await db.ProductSales.create({
        saleId: data.saleId,
        valueSale: data.valueSale,
        startDay: data.startDay,
        endDay: data.endDay,
        status: data.status,
      });
      return {
        errCode: 0,
        message: "Create Product Sale OK",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let deleteProductSale = async (productId) => {
  let product = await db.ProductSales.findOne({
    where: { id: productId },
  });
  if (!product) {
    return {
      errCode: 2,
      message: "Not Exit Product Sale",
    };
  }
  await db.ProductSales.destroy({
    where: { id: productId },
  });
  return {
    errCode: 0,
    message: "Delete Product Sale OK",
  };
};
let editProductSale = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID Product Sale",
      };
    }
    let product = await db.ProductSales.findOne({
      where: { id: data.id },
    });
    if (product) {
      (product.saleId = data.saleId), (product.valueSale = data.valueSale);
      product.startDay = data.startDay;
      product.endDay = data.endDay;
      product.status = data.status;
      await product.save();
      return {
        errCode: 0,
        message: "Update product Sale OK",
      };
    } else {
      return {
        errCode: 2,
        message: "Product Sale not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  getAllProductSale: getAllProductSale,
  createNewProductSale: createNewProductSale,
  deleteProductSale: deleteProductSale,
  editProductSale: editProductSale,
};
