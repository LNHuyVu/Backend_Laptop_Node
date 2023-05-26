import db from "../models/index";
let getAllOrder = async (orderId) => {
  try {
    let order = "";
    if (orderId === "ALL") {
      order = await db.Orders.findAll({
        order:[["id","DESC"]],
        include: [
          {
            model: db.Orderdetails,
            as: "orderDetail",
            include: [
              {
                model: db.Products,
                as: "product",
                attributes: ["id", "nameProduct"],
                include: [
                  {
                    model: db.ProductImages,
                    as: "imgData",
                    attributes: ["id", "link"],
                  },
                ],
              },
            ],
          },
          {
            model: db.User,
            as: "user",
            attributes: {
              exclude: [
                "password",
                "createdAt",
                "createdBy",
                "updatedAt",
                "status",
                "img",
              ],
            },
          },
        ],
      });
    }
    if (orderId && orderId !== "ALL") {
      order = await db.Orders.findOne({
        where: { id: orderId },
        include: [
          {
            model: db.Orderdetails,
            as: "orderDetail",
            include: [
              {
                model: db.Products,
                as: "product",
                attributes: ["id", "nameProduct"],
                include: [
                  {
                    model: db.ProductImages,
                    as: "imgData",
                    attributes: ["id", "link"],
                  },
                ],
              },
            ],
          },
          {
            model: db.User,
            as: "user",
            attributes: {
              exclude: [
                "password",
                "createdAt",
                "createdBy",
                "updatedAt",
                "status",
                "img",
              ],
            },
          },
        ],
      });
    }
    return order;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewOrder = async (data) => {
  try {
    let order = await db.Orders.create({
      name: data.name,
      userId: data.userId,
      codeOrder: data.codeOrder,
      address: data.address,
      phone: data.phone,
      email: data.email,
      status: data.status,
    });
    return {
      errCode: 0,
      message: "Create Order OK",
      order,
    };
  } catch (e) {
    throw new Error(e);
  }
};
let deleteOrder = async (OrderId) => {
  let order = await db.Orders.findOne({
    where: { id: OrderId },
  });
  if (!order) {
    return {
      errCode: 2,
      message: "Not Exit ID Order",
    };
  }
  await db.Orders.destroy({
    where: { id: OrderId },
  });
  return {
    errCode: 0,
    message: "Delete Order OK",
  };
};
let editOrder = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: 1,
        message: "Missing request ID Order",
      };
    }
    let order = await db.Orders.findOne({
      where: { id: data.id },
    });
    if (order) {
      (order.name = data.name),
        (order.userId = data.userId),
        (order.codeOrder = data.codeOrder),
        (order.address = data.address),
        (order.phone = data.phone),
        (order.email = data.email),
        (order.status = data.status),
        await order.save();
      return {
        errCode: 0,
        message: "Update order OK",
      };
    } else {
      return {
        errCode: 2,
        message: "ID order not found",
      };
    }
  } catch (e) {
    throw new Error(e);
  }
};
module.exports = {
  getAllOrder: getAllOrder,
  createNewOrder: createNewOrder,
  deleteOrder: deleteOrder,
  editOrder: editOrder,
};
