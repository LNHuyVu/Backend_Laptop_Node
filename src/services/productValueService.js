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
      productvalue = await db.ProductValues.findAll({});
    }
    if (productId && productId !== "ALL") {
      productvalue = await db.ProductValues.findOne({
        where: { id: productId },
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
    } else {
      await db.ProductValues.create({
        nameValue: data.nameValue,
        slug: data.slug,
        parentIdValue: data.parentIdValue,
        createdBy: data.createdBy,
        statusValue: data.statusValue,
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
        (product.slug = data.slug),
        (product.parentIdValue = data.parentIdValue);
      product.statusValue = data.statusValue;
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
//Cus
let getAllProductValueCustomer = async (slug, limit = 5) => {
  try {
    let productvalue = "";
    let option = "";
    if (slug && slug != "") {
      productvalue = await db.ProductValues.findOne({
        where: { slug: slug },
      });
      option = await db.ProductOptions.findAll({
        // limit: limit,
        where: { demand: productvalue.id },
        include: [
          {
            model: db.Products,
            as: "product",
            attributes: [
              "id",
              "catId",
              "nameProduct",
              "price",
              "slugProduct",
              "proId",
            ],
            include: [
              {
                model: db.ProductStores,
                as: "store",
                attributes: ["id", "number"],
              },
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
                    // "id",
                    "optionId",
                    "cpu",
                    "ram",
                    "hdrive",
                    "screen",
                    "system",
                    "cpuGen",
                    "card",
                    "demand",
                    "updatedAt",
                    "createdAt",
                  ],
                },
              },
            ],
          },
        ],
        attributes: {
          exclude: [
            "id",
            "optionId",
            "cpu",
            "ram",
            "hdrive",
            "screen",
            "system",
            "cpuGen",
            "card",
            "demand",
            "updatedAt",
            "createdAt",
          ],
        },
      });
    }
    return option;
  } catch (e) {
    throw new Error(e);
  }
};
let getDemandProductValueCustomer = async (slug, limit = 5) => {
  try {
    let productvalue = "";
    let option1 = "";
    let option = [];

    //EX Find SLug=>Id (CPU, RAM, ...)
    if (slug == "demand") {
      productvalue = await db.ProductValues.findAll({
        where: { parentIdValue: 7 },
        attributes: ["id"],
      });
      for (const item of productvalue) {
        option1 = await db.ProductOptions.findAll({
          // offset: 3,
          limit: limit,
          where: { demand: item.dataValues.id },
          include: [
            {
              model: db.Products,
              as: "product",
              attributes: [
                "id",
                "catId",
                "nameProduct",
                "price",
                "slugProduct",
                "proId",
              ],
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
                      // "id",
                      "optionId",
                      "cpu",
                      "ram",
                      "hdrive",
                      "screen",
                      "system",
                      "cpuGen",
                      "card",
                      "demand",
                      "updatedAt",
                      "createdAt",
                    ],
                  },
                },
              ],
            },
          ],
          attributes: {
            exclude: [
              "id",
              "optionId",
              "cpu",
              "ram",
              "hdrive",
              "screen",
              "system",
              "cpuGen",
              "card",
              "demand",
              "updatedAt",
              "createdAt",
            ],
          },
        });
        option = [...option, option1];
      }
    }
    return option;
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  getAllProductValue: getAllProductValue,
  createNewProductValue: createNewProductValue,
  deleteProductValue: deleteProductValue,
  editProductValue: editProductValue,
  ///
  getAllProductValueCustomer: getAllProductValueCustomer,
  getDemandProductValueCustomer: getDemandProductValueCustomer,
};
