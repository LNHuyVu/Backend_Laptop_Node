import { Model } from "sequelize";
import db from "../models/index";
const { Sequelize } = require("sequelize");
let getAllOrderDetail = async (OrderDetailId) => {
  try {
    let orderdetail = "";
    if (OrderDetailId === "ALL") {
      orderdetail = await db.Orderdetails.findAll({
        include: [
          {
            model: db.Products,
            as: "product",
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
            attributes: {
              exclude: ["detail"],
            },
          },
        ],
      });
    }
    if (OrderDetailId && OrderDetailId !== "ALL") {
      orderdetail = await db.Orderdetails.findOne({
        where: { id: OrderDetailId },
      });
    }
    return orderdetail;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewOrderDetail = async (data) => {
  try {
    await db.Orderdetails.create({
      orderId: data.orderId,
      productId: data.productId,
      price: data.price,
      quantity: data.quantity,
      amount: data.amount,
    });
    return {
      errCode: 0,
      message: "Create OrderDetail OK",
    };
  } catch (e) {
    throw new Error(e);
  }
};
let deleteOrderDetail = async (OrderDetailId) => {
  let orderdetail = await db.Orderdetails.findOne({
    where: { id: OrderDetailId },
  });
  if (!orderdetail) {
    return {
      errCode: 2,
      message: "Not Exit ID OrderDetail",
    };
  }
  await db.Orderdetails.destroy({
    where: { id: OrderDetailId },
  });
  return {
    errCode: 0,
    message: "Delete OrderDetail OK",
  };
};
let editOrderDetail = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID OrderDetail",
      };
    }
    let orderdetail = await db.Orderdetails.findOne({
      where: { id: data.id },
    });
    if (orderdetail) {
      (orderdetail.orderId = data.orderId),
        (orderdetail.productId = data.productId),
        (orderdetail.price = data.price),
        (orderdetail.quantity = data.quantity),
        (orderdetail.amount = data.amount);
      await orderdetail.save();
      return {
        errCode: 0,
        message: "Update orderdetail OK",
      };
    } else {
      return {
        errCode: 2,
        message: "ID Orderdetail not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
let getAllProducthot = async (OrderDetailId) => {
  try {
    let orderdetail = "";
    if (OrderDetailId === "ALL") {
      try {
        orderdetail = await db.Orderdetails.findAll({
          include: [
            {
              model: db.Products,
              as: "product",
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
            },
          ],
          attributes: [
            "productId",
            [Sequelize.fn("sum", Sequelize.col("quantity")), "SL"],
          ],
          group: ["productId"],
          limit: 10,
          order: [["SL", "DESC"]],
        });
      } catch (error) {
        console.log(error);
      }
    }
    return orderdetail;
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  getAllOrderDetail: getAllOrderDetail,
  createNewOrderDetail: createNewOrderDetail,
  deleteOrderDetail: deleteOrderDetail,
  editOrderDetail: editOrderDetail,
  //Product hot
  getAllProducthot: getAllProducthot,
};
