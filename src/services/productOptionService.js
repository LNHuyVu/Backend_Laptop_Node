import db from "../models/index";

let getAllProductOption = async (productId) => {
  try {
    let productoption = "";
    if (productId === "ALL") {
      productoption = await db.ProductOptions.findAll({
        include: [
          {
            model: db.ProductValues,
            as: "value",
            attributes: ["id", "nameValue"],
          },
        ],
      });
    }
    if (productId && productId !== "ALL") {
      productoption = await db.ProductOptions.findOne({
        where: { id: productId },
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
      });
    }
    return productoption;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewProductOption = async (data) => {
  try {
    {
      await db.ProductOptions.create({
        optionId: data.optionId,
        cpu: data.cpu,
        cpuGen: data.cpuGen,
        ram: data.ram,
        demand: data.demand,
        hdrive: data.hdrive,
        card: data.card,
        screen: data.screen,
        system: data.system,
      });
      return {
        errCode: 0,
        message: "Create ProductOption OK",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let deleteProductOption = async (productId) => {
  let product = await db.ProductOptions.findOne({
    where: { optionId: productId },
  });
  if (!product) {
    return {
      errCode: 2,
      message: "Not Exit Product Option",
    };
  }
  await db.ProductOptions.destroy({
    where: { optionId: productId },
  });
  return {
    errCode: 0,
    message: "Delete Product Option OK",
  };
};
let editProductOption = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID Product Option",
      };
    }
    let product = await db.ProductOptions.findOne({
      where: { id: data.id },
    });
    if (product) {
      product.optionId = data.optionId;
      product.cpu = data.cpu;
      product.cpuGen = data.cpuGen;
      product.ram = data.ram;
      product.demand = data.demand;
      product.card = data.card;
      product.hdrive = data.hdrive;
      product.screen = data.screen;
      product.system = data.system;
      await product.save();
      return {
        errCode: 0,
        message: "Update product Option OK",
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
  getAllProductOption: getAllProductOption,
  createNewProductOption: createNewProductOption,
  deleteProductOption: deleteProductOption,
  editProductOption: editProductOption,
};
