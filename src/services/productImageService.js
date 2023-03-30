import db from "../models/index";

let getAllProductImage = async (productId) => {
  try {
    let productimage = "";
    if (productId === "ALL") {
      productimage = await db.ProductImages.findAll({
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
      productimage = await db.ProductImages.findOne({
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
    return productimage;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewProductImage = async (data) => {
  try {
    // let check = await checkProductName(data.nameValue);
    // if (check === true) {
    //   return {
    //     errCode: 1,
    //     message: "Your name product value is already in used",
    //   };
    // } else
    {
      await db.ProductImages.create({
        link: data.link,
        imgId: data.imgId,
        status: data.status,
      });
      return {
        errCode: 0,
        message: "Create Product Image OK",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let deleteProductImage = async (productId) => {
  let productimage = await db.ProductImages.findOne({
    where: { imgId: productId },
  });
  if (!productimage) {
    return {
      errCode: 2,
      message: "Not Exit Product Image",
    };
  }
  await db.ProductImages.destroy({
    where: { imgId: productId },
  });
  return {
    errCode: 0,
    message: "Delete Product Image OK",
  };
};
let editProductImage = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID Product Image",
      };
    }
    let productimage = await db.ProductImages.findOne({
      where: { id: data.id },
    });
    if (productimage) {
      productimage.link = data.link;
      productimage.imgId = data.imgId;
      productimage.status = data.status;
      await productimage.save();
      return {
        errCode: 0,
        message: "Update product Image OK",
      };
    } else {
      return {
        errCode: 2,
        message: "Product Image not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  getAllProductImage: getAllProductImage,
  createNewProductImage: createNewProductImage,
  deleteProductImage: deleteProductImage,
  editProductImage: editProductImage,
};
