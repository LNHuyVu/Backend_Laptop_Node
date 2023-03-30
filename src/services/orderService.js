import db from "../models/index";
let getAllOrder = async (orderId) => {
  try {
    let order = "";
    if (orderId === "ALL") {
      order = await db.Orders.findAll({});
    }
    if (orderId && orderId !== "ALL") {
      order = await db.Orders.findOne({
        where: { id: orderId },
      });
    }
    return order;
  } catch (e) {
    throw new Error(e);
  }
};
let createNewOrder = async (data) => {
  try {
    await db.Orders.create({
      userId: data.userId,
      codeOrder: data.codeOrder,
      address: data.address,
      phone: data.phone,
      email: data.email,
    });
    return {
      errCode: 0,
      message: "Create Order OK",
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
      (order.userId = data.userId),
        (order.codeOrder = data.codeOrder),
        (order.address = data.address),
        (order.phone = data.phone),
        (order.email = data.email),
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
