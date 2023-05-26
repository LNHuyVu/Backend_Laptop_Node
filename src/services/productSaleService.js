import db from "../models/index";
let checkSaleId = async (saleId) => {
  try {
    let sale = await db.ProductSales.findOne({
      where: { saleId: saleId },
    });
    if (sale) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw new Error(e);
  }
};
let getAllProductSale = async (productId) => {
  try {
    let productsale = "";
    if (productId === "ALL") {
      productsale = await db.ProductSales.findAll({
        order: [["id","DESC"]],
        include: [
          {
            model: db.Products,
            as: "productSale",
            include: {
              model: db.ProductImages,
              as: "imgData",
              attributes: ["id", "imgId", "link"],
            },
            attributes: ["id", "nameProduct", "price"],
          },
        ],
      });
    }
    if (productId && productId !== "ALL") {
      productsale = await db.ProductSales.findOne({
        where: { id: productId },
        include: [
          {
            model: db.Products,
            as: "productSale",
            include: [
              {
                model: db.ProductImages,
                as: "imgData",
                attributes: ["id", "imgId", "link"],
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
            attributes: ["id", "nameProduct", "price"],
          },
        ],
      });
    }
    return productsale;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewProductSale = async (data) => {
  try {
    if (Array.isArray(data)) {
      await db.ProductSales.bulkCreate(data, {
        ignoreDuplicates: true,
        // updateOnDuplicate: ["saleId"],
      });
      return {
        errCode: 0,
        message: "Create Product Sale OK",
      };
    } else {
      let check = await checkSaleId(data.saleId);
      if (check === true) {
        return {
          errCode: 1,
          message: "Your ID SALE is already in used",
        };
      } else {
        await db.ProductSales.create({
          saleId: data.saleId,
          createdBy: data.createdBy,
          status: data.status,
        });
        return {
          errCode: 0,
          message: "Create Product Sale OK",
        };
      }
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
    //Check info sale
    let check = "";
    if (
      product.endDay == null ||
      product.startDay == null ||
      product.valueSale == null
    ) {
      check = false;
    } else {
      check = true;
    }

    if (product) {
      product.valueSale = data.valueSale;
      product.startDay = data.startDay;
      product.endDay = data.endDay;
      product.createdBy = data.createdBy;
      product.status = data.status === 1 ? (check ? 1 : 0) : 0;
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
